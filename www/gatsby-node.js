const path = require('path')

const createContributorNode = require('./nodeHelpers/createContributorNode')
const createLocalNodes = require('./nodeHelpers/createLocalNodes.js')
const createNodes = require('./nodeHelpers/createContentNodes')

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

  // If we're developing with a local copy of the kommunity-content repo, the process of creating content nodes is a bit different
  if (type === 'ContentJson') {
    createLocalNodes({ node, createNode })
  }

  // Parsing the Github repository and creating nodes for suggestions and contributors
  else if (
    type === 'GithubRepository' &&
    name === 'kommunity-content' &&
    files &&
    Array.isArray(files.entries)
  ) {
    createNodes({ files, createNode, createNodeField })
  }

  // Finally, getting further data on each contributor
  else if (type === 'KommunityContributor') {
    await createContributorNode({ node, handle, createNodeField, getNodes })
  }
}
