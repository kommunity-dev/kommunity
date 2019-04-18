import { ISubmissionPayload } from '@kompanion/types'
import { slugifyString } from '@kompanion/utils'
import * as React from 'react'

export interface ISubmissionPlaceholderProps {
  submission: ISubmissionPayload
  setSubmission?: (value: null) => void
}

export const SubmissionPlaceholder: React.SFC<ISubmissionPlaceholderProps> = ({
  submission
}) => {
  return (
    <section>
      <h2 style={{ marginTop: '2.5em' }}>Ops, you've got us off-guard 🤗</h2>
      <p>
        Automatically submitting you content still isn't available! Setting up
        the lambda function to do so has proven to be quite the challenge, which{' '}
        <a
          href="https://github.com/kompanion/kompanion"
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
      <pre>
        <code>{JSON.stringify(submission, null, 2)}</code>
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
        and name the file <code>{slugifyString(submission.url)}</code>
      </p>
      <p>
        <span className="number-indicator">4</span> name your commit and add a
        description (if wanted) and hit <i>"propose new file"</i>
      </p>
      <p>
        <span className="number-indicator">5</span> <b>Done! 🎉</b> Now go enjoy
        the rest of your day and we'll review your submission as soon as
        possible 💜
      </p>
    </section>
  )
}

SubmissionPlaceholder.displayName = 'SubmissionPlaceholder'

export default SubmissionPlaceholder
