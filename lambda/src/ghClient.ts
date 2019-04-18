import * as octokit from '@octokit/rest'
import dotenv from 'dotenv'

dotenv.config({
  path: `../../.env.development`
})

const token = process.env.GH_ACCESS_TOKEN

export const ghClient = new octokit({
  auth: `token ${token}`
})

export const repoInfo = {
  owner: 'kompanion',
  repo: 'kommunity-content'
}
