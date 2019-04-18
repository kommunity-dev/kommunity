const path = require('path')
const axios = require('axios')
const crypto = require('crypto')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const { data: collabData } = await graphql(`
      {
        contributors: allKommunityContributor {
          edges {
            node {
              id
              handle
            }
          }
        }
      }
    `)
    if (
      !collabData ||
      !collabData.contributors ||
      !Array.isArray(collabData.contributors.edges)
    ) {
      console.info("Couldn't get contributors in createPages")
      return
    }
    for (const { node } of collabData.contributors.edges) {
      createPage({
        path: `/contributors/${node.handle}`,
        component: path.resolve('./src/templates/ContributorTemplate.tsx'),
        context: {
          id: node.id
        }
      })
    }
  } catch (error) {
    console.info(`Couldn't get all contributors`)
    console.error(error)
  }
}

exports.onCreateNode = async ({ node, actions, getNodes, ...rest }) => {
  const { createNode, createNodeField } = actions
  const {
    internal: { type },
    name,
    files,
    handle
  } = node

  // Parsing the Github repository and creating nodes for suggestions and contributors
  if (
    type === 'GithubRepository' &&
    name === 'kommunity-content' &&
    files &&
    Array.isArray(files.entries)
  ) {
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
        ...content,
        recommendations: content.recommendations.map(({ comment, user }) => ({
          user___NODE: `kommContributor-${user}`,
          comment
        })),
        parent: null,
        internal: {
          mediaType: 'application/json',
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
  } else if (type === 'KommunityContributor') {
    // console.log(Object.keys(rest), rest.getNode)
    console.time(`\n===============\nFetching ${handle}`)
    const query = `
      query {
        user(login: "${handle}") {
          avatar32: avatarUrl(size: 32)
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
        const { avatar32, avatar240, name, bio } = data.data.user
        createNodeField({
          node,
          name: 'avatar32',
          value: avatar32
        })
        createNodeField({
          node,
          name: 'avatar240',
          value: avatar240
        })
        createNodeField({
          node,
          name: 'name',
          value: name
        })
        createNodeField({
          node,
          name: 'bio',
          value: bio
        })
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
}
