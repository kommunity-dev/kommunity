import { ICuratedContent } from './curatedContent'

export interface ISubmissionPayload extends Partial<ICuratedContent> {
  lastUpdated: string // 2019-04-30
  recommendations?: Array<{
    comment: string
    user: string
  }>
}

export type TSubmissionFormatErrors =
  | undefined
  | 'No body attached to the request'
  | 'No valid URL given'
  | 'No valid topic given'
  | 'No valid format given'
  | 'No valid skill level given'
  | 'No title given'
  | 'Missing lastUpdated'
  | 'Missing recommendations'
  | 'Recommendation is missing an user and/or comment'

export type TSubmissionInternalErrors =
  | undefined
  | 'Failed to get information on the repo'
  | 'Failed to create new branch'
  | 'Failed to create new file'
  | 'Failed to create new PR'
