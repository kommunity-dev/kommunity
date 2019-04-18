import { slugifyString } from '@kompanion/utils'
import { ghClient, repoInfo } from './ghClient'

export const getMasterRef = async () => {
  try {
    // Get the ref for the master branch
    const { data } = await ghClient.git.getRef({
      ...repoInfo,
      ref: 'heads/master'
    })

    if (!data.object || typeof data.object.sha !== 'string') {
      return
    }
    return data.object.sha
  } catch (error) {
    console.error(error)
    return
  }
}

export const createBranch = async ({ sha, branchPath }) => {
  try {
    const { data } = await ghClient.git.createRef({
      ...repoInfo,
      ref: `refs/heads/${branchPath}`,
      sha
    })

    if (!data.object || typeof data.object.sha !== 'string') {
      return
    }
    return true
  } catch (error) {
    console.error(error)
    return
  }
}

// TODO: add commiter info to avoid associating with
// a single user. Fallback to an app's info
export const createFile = async ({ url, user, encodedContent, branchPath }) => {
  try {
    const { data } = await ghClient.repos.createFile({
      ...repoInfo,
      path: `content/${slugifyString(url)}.json`,
      message: `Submission of the ${url} by ${user}`,
      content: encodedContent,
      branch: branchPath
    })
    if (data.content && typeof data.content.sha === 'string') {
      return true
    }
    return
  } catch (error) {
    console.error(error)
  }
}

export const createPR = async ({ url, user, branchPath }) => {
  try {
    const { data } = await ghClient.pulls.create({
      ...repoInfo,
      head: branchPath,
      base: 'master',
      title: `${user} - add ${url}`,
      // TODO: update this body template to include a link to kommunity
      body: `Add [${url}](${url}) to the kompanion kommunity directory.\n\n**By:** @${user}`
    })
    if (!data || typeof data.html_url !== 'string') {
      return
    }
    return data.html_url
  } catch (error) {
    console.error(error)
    return
  }
}
