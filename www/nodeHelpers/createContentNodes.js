const crypto = require('crypto')

module.exports = ({ files, createNode, createNodeField }) => {
  console.time('\n====================\nCreating nodes')
  const { entries } = files

  for (const entry of entries) {
    const { object, name } = entry
    if (
      typeof name !== 'string' ||
      !object ||
      typeof object.text !== 'string'
    ) {
      continue
    }

    const content = JSON.parse(object.text)
    // TODO: better type checking for the content object
    // category, format and skillLevel are all necessary
    if (
      !content ||
      typeof content.title !== 'string' ||
      typeof content.url !== 'string' ||
      !Array.isArray(content.recommendations)
    ) {
      continue
    }

    const contributors = content.recommendations.map(r => r.user)

    for (const c of contributors) {
      if (typeof c !== 'string') {
        continue
      }

      createNode({
        id: `kommContributor-${c}`,
        handle: c,
        parent: null,
        children: [],
        internal: {
          type: 'KommunityContributor',
          contentDigest: crypto
            .createHash(`md5`)
            .update(c)
            .digest(`hex`)
        }
      })
    }

    const contributorsNodes = contributors.map(c => `kommContributor-${c}`)

    createNode({
      id: name,
      contributors___NODE: contributorsNodes,
      contributorCount: contributorsNodes.length,
      ...content,
      recommendations: content.recommendations.map(
        ({ comment, user, twitterUrl }) => ({
          user___NODE: `kommContributor-${user}`,
          comment,
          twitterUrl
        })
      ),
      parent: null,
      internal: {
        type: 'KommunityContent',
        contentDigest: crypto
          .createHash(`md5`)
          .update(object.text)
          .digest(`hex`),
        content: object.text,
        description: `Kommunity content node: ${content.title}`
      }
    })
  }
  console.timeEnd('\n====================\nCreating nodes')
}
