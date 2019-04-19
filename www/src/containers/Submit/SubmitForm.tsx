import {
  contentFormats,
  contentLevels,
  contentTopics,
  readableLevels
} from '@kompanion/mock-data'
import {
  ISubmissionPayload,
  TFormats,
  TSkillLevels,
  TTopics
} from '@kompanion/types'
import { capitalizeFirstLetter, scrollToId } from '@kompanion/utils'
import * as React from 'react'
import { useFormState } from 'react-use-form-state'

import { formatIcons } from '../../components/formatIcons'
import { skillLevelIcon } from '../../components/levelIcons'
import SubmissionPlaceholder from './SubmissionPlaceholder'

import '../../components/styles/card-checkbox.css'
import '../../components/styles/form.css'

const TITLE_MAX_LENGTH = 65
const COMMENT_MAX_LENGTH = 240

export interface ISubmissionFormFields {
  url: string
  title: string
  user: string
  comment: string
  topic?: TTopics
  format?: TFormats
  skillLevel?: TSkillLevels
}

export const submissionInitialState: ISubmissionFormFields = {
  url: '',
  title: '',
  user: '',
  comment: ''
}

export const SubmitForm: React.SFC<{}> = () => {
  // General form state
  const [state, { text, textarea, radio, label, url }] = useFormState<
    ISubmissionFormFields
  >(submissionInitialState, {
    withIds: true
  })

  const [isSubmitting, setSubmitting] = React.useState(false)
  const [submission, setSubmission] = React.useState<ISubmissionPayload | null>(
    null
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const { user, comment, ...formState } = state.values
    const finalSubmission = {
      ...formState,
      lastUpdated: new Date().toISOString().split('T')[0],
      recommendations: [
        {
          user,
          comment
        }
      ]
    }
    setSubmission(finalSubmission)
    scrollToId('submit-title')
    setSubmitting(false)
  }

  // We want to update the disabled state and wording of the submission button
  // depending on the current state of the URL
  const hasUrl = state.validity.url && state.values.url !== ''
  const isUrlInvalid = state.touched.url && !state.validity.url

  // Used by the title input to show how many characters are left
  const titleChars = TITLE_MAX_LENGTH - state.values.title.length

  // Used by the comment input to show how many characters are left
  const commentChars = COMMENT_MAX_LENGTH - state.values.comment.length

  const disableInputs = !hasUrl || isSubmitting

  if (!isSubmitting && submission !== null) {
    return (
      <SubmissionPlaceholder
        submission={submission}
        setSubmission={setSubmission}
      />
    )
  }

  return (
    <>
      <p>
        By filling the form below, kompanion will automatically make a pull
        request in our{' '}
        <a
          href="https://github.com/kompanion/kommunity-content"
          target="_blank"
        >
          GitHub content repository
        </a>{' '}
        to be approved by the maintainers community and added to the kommunity
        directory!
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isSubmitting} className="form__group">
          <div className="number-indicator">1</div>
          <label {...label('url')}>Resource URL / link</label>
          <input
            {...url('url')}
            required={true}
            className={`form__input ${isUrlInvalid ? 'alert' : ''}`}
          />
          {isUrlInvalid && (
            <div className="form__input-validation">
              <span className="form__input-error">
                Please provide a valid URL! (with the protocol)
              </span>
            </div>
          )}
        </fieldset>

        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">2</div>
          <label {...label('title')}>Title for this resource</label>
          <input
            {...text('title')}
            maxLength={TITLE_MAX_LENGTH}
            required={true}
            className="form__input"
            placeholder="Try to be descriptive and to-the-point."
          />
          <div className="form__input-validation">
            <div
              className={`form__input-info ${titleChars <= 5 ? 'alert' : ''}`}
            >
              Characters left: <b>{titleChars}</b>
            </div>
          </div>
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">3</div>
          <label {...label('comment')}>Why is it important?</label>
          <textarea
            className="form__input"
            placeholder="Tell other developers why you think they should consume this resource ;)"
            {...textarea('comment')}
            required={true}
            maxLength={COMMENT_MAX_LENGTH}
          />
          <div className="form__input-validation">
            <div
              className={`form__input-info ${
                commentChars <= 10 ? 'alert' : ''
              }`}
            >
              Characters left: <b>{commentChars}</b>
            </div>
          </div>
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group full-width">
          <div className="number-indicator">4</div>
          <legend>What's the format of this content?</legend>
          {contentFormats.map(f => (
            <div className="card-checkbox" key={f}>
              <input {...radio('format', f)} required={true} />
              <label {...label('format', f)}>
                <div>{formatIcons[f]({})}</div> {capitalizeFirstLetter(f)}
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group full-width">
          <div className="number-indicator">5</div>
          <legend>Who is it for?</legend>
          {contentLevels.map(l => (
            <div className="card-checkbox" key={l}>
              <input {...radio('skillLevel', l)} required={true} />
              <label {...label('skillLevel', l)}>
                <div>{skillLevelIcon[l]()}</div> {readableLevels[l]}
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group full-width">
          <div className="number-indicator">6</div>
          <legend>Which topic does it fit in?</legend>
          {contentTopics.map(c => (
            <div className="pill-checkbox" key={c}>
              <input {...radio('topic', c)} required={true} />
              <label {...label('topic', c)}>{c}</label>
            </div>
          ))}
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">7</div>
          <label {...label('user')}>Finally, what is you GitHub handle?</label>
          <input
            className="form__input"
            {...textarea('user')}
            required={true}
            placeholder="yourHandleHere"
            pattern="[^\s@]*"
          />
          {state.touched.user && !state.validity.user && (
            <div className="form__input-validation">
              <span className="form__input-error">
                Please provide a valid GitHub handle (don't include @)
              </span>
            </div>
          )}
        </fieldset>
        <button
          className="button button_primary"
          type="submit"
          disabled={disableInputs}
        >
          Send
        </button>
      </form>
    </>
  )
}

SubmitForm.displayName = 'SubmitForm'

export default SubmitForm
