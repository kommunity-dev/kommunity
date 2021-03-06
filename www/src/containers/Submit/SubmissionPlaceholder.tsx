import { ISubmissionPayload } from '@kompanion/kommunity-types'
import { slugifyString } from '@kompanion/utils'
import * as React from 'react'
import { useClipboard } from 'use-clipboard-copy'

import { submissionInitialState } from './SubmitForm'

import '../../components/styles/copy.css'

export interface ISubmissionPlaceholderProps {
  submission: ISubmissionPayload
  setSubmission: (value: null) => void
}

const fallbackSubmission: ISubmissionPayload = {
  ...submissionInitialState,
  recommendations: [],
  lastUpdated: ''
}

export const SubmissionPlaceholder: React.FunctionComponent<
  ISubmissionPlaceholderProps
> = props => {
  const clipboard = useClipboard({ copiedTimeout: 1250, selectOnCopy: false })
  const resetSubmission = () => props.setSubmission(null)
  const { submission = fallbackSubmission } = props
  const submittedUrl = (submission && submission.url) || ''
  const formattedJson = JSON.stringify(submission, null, 2)

  const copy = () => {
    clipboard.copy(formattedJson)
    if (document && window && window.getSelection && document.querySelector) {
      const selection = window.getSelection()
      const range = document.createRange()
      const textNode = document.querySelector('#content-json')

      if (selection && range && textNode) {
        range.selectNodeContents(textNode)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }
  return (
    <section>
      <h2 style={{ marginTop: '2.5em' }}>
        Thanks a ton for your contribution! ✨
      </h2>
      <p>Ops, you've got us off-guard 🤗</p>
      <p>
        Automatically submitting you content still isn't available! Setting up
        the lambda function to do so has proven to be quite the challenge, which{' '}
        <a
          href="https://github.com/kompanion/kommunity/issues/1"
          target="_blank"
          rel="noopener"
        >
          you can help tackle
        </a>
        ... so, in the meantime, we ask that you:
      </p>
      <p style={{ marginBottom: 0 }}>
        <span className="number-indicator">1</span> copy the JSON below
      </p>
      <pre className="copy__wrapper">
        <button
          onClick={copy}
          className={`button button_secondary copy__button ${
            clipboard.copied ? 'copied' : ''
          }`}
        >
          {clipboard.copied ? 'Copied!' : 'Copy'}
        </button>
        <code id="content-json">{formattedJson}</code>
      </pre>
      <p>
        <span className="number-indicator">2</span> start creating a new file in
        the Github repo by{' '}
        <a
          href="https://github.com/kompanion/kommunity-content/new/master/content"
          target="_blank"
          rel="noopener"
        >
          clicking here
        </a>
        .
      </p>
      <p style={{ maxWidth: 'none' }}>
        <span className="number-indicator">3</span> paste the JSON in the body
        and name the file <code>{slugifyString(submittedUrl)}.json</code>
      </p>
      <p>
        <span className="number-indicator">4</span> name your commit{' '}
        <code>
          {submission.recommendations && submission.recommendations[0].user} -
          add {submittedUrl}
        </code>
        , add a description (if you want) and hit <i>"propose new file"</i>
      </p>
      <p>
        <span className="number-indicator">5</span> <b>Done! 🎉</b> Now go enjoy
        the rest of your day and we'll review your submission as soon as
        possible 💜
      </p>
      <p style={{ marginBottom: '6rem' }}>
        <button onClick={resetSubmission} className="button button_secondary">
          Go back
        </button>
      </p>
    </section>
  )
}

SubmissionPlaceholder.displayName = 'SubmissionPlaceholder'

export default SubmissionPlaceholder
