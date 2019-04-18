import { FormState } from 'react-use-form-state'
import { ISubmissionFormFields } from './SubmitForm'

interface ISendSubmission {
  state: FormState<ISubmissionFormFields>
}

// TODO: finish the submission API and rig it to the form
export const sendSubmission = async ({ state }: ISendSubmission) => {
  // We'll need to extract the user and comment from the rest of the
  // state to include it inside the recommendations array.
  // Also, title is not managed by formState, so we need to explicitly add it
  // to the payload object
  const { user, comment, ...formState } = state.values
  const submission = {
    ...formState,
    lastUpdated: new Date().toISOString().split('T')[0],
    recommendations: [
      {
        user,
        comment
      }
    ]
  }
  try {
    const res = await window.fetch('http://localhost:3000/submit-resource', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission),
      method: 'POST'
    })
    if (res.status === 200) {
      const json = await res.json()
      console.log(json)
    } else if (res.status === 400) {
      const formattingErr = await res.text()
      console.log(formattingErr)
    } else if (res.status === 500) {
      const internalErr = await res.text()
      console.log(internalErr)
    } else {
      console.log(res)
    }
  } catch (error) {
    console.error(error)
  }
}
