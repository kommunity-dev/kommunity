const crypto = require('crypto')

module.exports = ({ node, createNode }) => {
  const contributors = node.recommendations.map(r => r.user)
  for (const c of contributors) {
    console.log(c)
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
  const { internal, parent, children, id, ...nodeContent } = node

  const content = {
    ...nodeContent,
    id: `kommContent-${node.url}`,
    contributors___NODE: contributorsNodes,
    contributorCount: contributorsNodes.length,
    recommendations: node.recommendations.map(
      ({ comment, user, twitterUrl }) => ({
        user___NODE: `kommContributor-${user}`,
        comment,
        twitterUrl
      })
    )
  }

  createNode({
    ...content,
    parent: null,
    children: [],
    internal: {
      type: 'KommunityContent',
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(content))
        .digest(`hex`),
      content: JSON.stringify(content),
      description: `Kommunity content node: ${node.title}`
    }
  })
}
