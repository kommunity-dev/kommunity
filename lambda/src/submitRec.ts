import {
  ISubmissionPayload,
  TSubmissionFormatErrors,
  TSubmissionInternalErrors
} from '@kompanion/types'
import { slugifyString } from '@kompanion/utils'
import { createBranch, createFile, createPR, getMasterRef } from './ghUtils'
import { validateSubmit } from './validateSubmit'

interface IWrongFormatRes {
  body: {
    error: TSubmissionFormatErrors
  }
  statusCode: 400
}

interface IInternalErrRes {
  body: {
    error: TSubmissionInternalErrors
  }
  statusCode: 500
}

interface ISuccessfulRes {
  statusCode: 200
  body: {
    createdPR: string
  }
}

export type TSubmitRecRes = IWrongFormatRes | IInternalErrRes | ISuccessfulRes

// TODO: accomodate for updating an existing submission
export const submitRec = async (
  payload: ISubmissionPayload
): Promise<TSubmitRecRes> => {
  const { error, user, payload: submission } = validateSubmit(payload)

  // If there's anything wrong with the submission, return a 400
  if (error !== undefined) {
    return {
      statusCode: 400,
      body: { error }
    }
  }

  // Else let's start the process of creating the PR
  console.time(`\n======\nTotal time to add ${submission.url}:`)
  const { url } = payload

  const sha = await getMasterRef()
  if (sha === undefined) {
    return {
      statusCode: 500,
      body: {
        error: 'Failed to get information on the repo'
      }
    }
  }

  const branchPath = `${slugifyString(url)}-${user}`
  const isBranchCreated = await createBranch({
    sha,
    branchPath
  })

  if (isBranchCreated !== true) {
    return {
      statusCode: 500,
      body: {
        error: 'Failed to create new branch'
      }
    }
  }

  // TODO: if failing to create file, delete created branch
  const encodedContent = Buffer.from(
    JSON.stringify(payload, null, 2),
    'ascii'
  ).toString('base64')
  const isFileCreated = await createFile({
    url,
    user,
    encodedContent,
    branchPath
  })

  if (isFileCreated !== true) {
    return {
      statusCode: 500,
      body: {
        error: 'Failed to create new file'
      }
    }
  }

  // TODO: if failing to create PR, delete created branch
  const createdPR = await createPR({ url, user, branchPath })
  if (typeof createdPR !== 'string') {
    return {
      statusCode: 500,
      body: {
        error: 'Failed to create new PR'
      }
    }
  }

  console.timeEnd(`\n======\nTotal time to add ${submission.url}:`)

  // if all goes well, return the created PR
  return {
    statusCode: 200,
    body: {
      createdPR
    }
  }
}
