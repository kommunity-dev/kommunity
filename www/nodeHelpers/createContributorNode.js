const axios = require('axios')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = async ({ node, createNodeField, handle, getNodes }) => {
  if (typeof handle !== 'string') {
    return
  }
  console.time(`\n===============\nFetching ${handle}`)
  const query = `
      query {
        user(login: "${handle}") {
          avatar32: avatarUrl(size: 32)
          avatar100: avatarUrl(size: 100)
          avatar240: avatarUrl(size: 240)
          name
          bio
        }
      }
    `

  // Get the contributor's name and image from GitHub
  try {
    const ghRes = await axios.post(
      'https://api.github.com/graphql',
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`
        }
      }
    )
    const { data } = ghRes
    if (data.data && data.data.user) {
      for (const key of Object.keys(data.data.user)) {
        createNodeField({
          node,
          name: key,
          value: data.data.user[key]
        })
      }
    } else {
      console.error(`Couldn't get user data for ${handle}`)
    }
  } catch (error) {
    console.info(`Couldn't fetch @${handle}'s GH profile`)
    console.error(error)
  }

  // Add all the suggestions submitted by the user to their node
  try {
    const allNodes = await getNodes()
    const suggestionsIds = allNodes
      .filter(
        ({ internal, contributors___NODE }) =>
          internal.type === 'KommunityContent' &&
          contributors___NODE.indexOf(node.id) >= 0
      )
      .map(({ id }) => id)
    createNodeField({
      node,
      name: 'suggestions___NODE',
      value: suggestionsIds
    })
    createNodeField({
      node,
      name: 'suggestionsCount',
      value: suggestionsIds.length
    })
  } catch (error) {
    console.info(`Couldn't get @${handle}'s suggestions`)
    console.error(error)
  }
  console.timeEnd(`\n===============\nFetching ${handle}`)
}
