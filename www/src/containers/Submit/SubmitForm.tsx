import {
  ISubmissionPayload,
  TFormats,
  TSkillLevels,
  TTopics
} from '@kompanion/types'
import {
  contentFormats,
  contentLevels,
  contentTopics
} from '@kompanion/mock-data'
import * as React from 'react'
import { useFormState } from 'react-use-form-state'

import '../../components/styles/form.css'
import { sendSubmission } from './submissionApi'
import SubmissionPlaceholder from './SubmissionPlaceholder'

const TITLE_MAX_LENGTH = 65

export interface ISubmissionFormFields {
  url: string
  title: string
  user: string
  comment: string
  topic?: TTopics
  format?: TFormats
  skillLevel?: TSkillLevels
}

const initialState: ISubmissionFormFields = {
  url: '',
  title: '',
  user: '',
  comment: ''
}

export const SubmitForm: React.SFC<{}> = () => {
  // General form state
  const [state, { text, textarea, radio, label, url }] = useFormState<
    ISubmissionFormFields
  >(initialState, {
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
    setSubmitting(false)
  }

  // We want to update the disabled state and wording of the submission button
  // depending on the current state of the URL
  const hasUrl = state.validity.url && state.values.url !== ''

  // Used by the title input to show how many characters are left
  const titleChars = TITLE_MAX_LENGTH - state.values.title.length

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
          <input {...url('url')} required={true} className="form__input" />
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
          {titleChars < 30 && (
            <span>
              Characters left: <b>{titleChars}</b>
            </span>
          )}
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">3</div>
          <label {...label('comment')}>Why is it important?</label>
          <textarea
            className="form__input"
            placeholder="Tell other developers why you think they should consume this resource ;)"
            {...textarea('comment')}
            required={true}
          />
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">4</div>
          <legend>What's the format of this content?</legend>
          {contentFormats.map(f => (
            <div key={f}>
              <label {...label('format', f)}>{f}</label>
              <input {...radio('format', f)} />
            </div>
          ))}
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">5</div>
          <legend>Who is it for?</legend>
          {contentLevels.map(l => (
            <div key={l}>
              <label {...label('skillLevel', l)}>{l}</label>
              <input {...radio('skillLevel', l)} />
            </div>
          ))}
        </fieldset>
        <fieldset disabled={disableInputs} className="form__group">
          <div className="number-indicator">6</div>
          <legend>Which topic does it fit in?</legend>
          {contentTopics.map(c => (
            <div key={c}>
              <label {...label('topic', c)}>{c}</label>
              <input {...radio('topic', c)} />
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
            placeholder="@yourNameHere"
          />
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
