// See https://github.com/jlengstorf/gatsby-feedback-widget/blob/master/src/components/feedback-widget/feedback-widget.js
import {
  contentFormats,
  contentLevels,
  contentTopics,
  readableLevels
} from '@kompanion/mock-data'
import { useMachine } from '@xstate/react'
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
import { formMachine } from './submitMachine'
import { interpret, assign } from 'xstate'

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

export const SubmitForm: React.FunctionComponent<{}> = () => {
  const machine = React.useMemo(
    () =>
      formMachine.withConfig({
        guards: {
          canRetry: ctx => ctx.attempts < 2,
          goToManual: ctx => ctx.attempts >= 2,
          canSend: ctx => ctx.canSend
        }
      }),
    [] // Machine should never change
  )
  const [current, send] = useMachine(machine)

  const { canSend } = current.context
  // console.log({ canSend, current: current.context })
  console.log(current.context)

  const validate = () => {
    send('VALIDATE')
  }

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    send({
      type: 'UPDATE_URL',
      value: e.target.value
    })
  }

  return (
    <>
      <input type="url" value={current.context.url} onChange={handleUrl} />
      {current.matches('badUrl') ? (
        <>
          <button onClick={() => send('FETCH')}>FETCH</button>
          <button onClick={() => send('RESOLVE')}>RESOLVE</button>
          <button onClick={() => send('REJECT')}>REJECT</button>
        </>
      ) : (
        <>
          <button onClick={() => send('UPDATE_URL')}>UPDATE</button>
          <button onClick={validate}>allow submission</button>
          <button disabled={!canSend} onClick={() => send('SUBMIT')}>
            Submit
          </button>
        </>
      )}
    </>
  )
}

SubmitForm.displayName = 'SubmitForm'

export default SubmitForm
