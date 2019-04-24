import { IContentCard } from '@kompanion/types'
import { graphql } from 'gatsby'
import * as React from 'react'

import GatsbyIcon from '../components/GatsbyIcon'
import Header from '../components/Header'
import PageMeta from '../components/PageMeta'
import Directory from '../containers/Directory/Directory'

import '../layouts/home.css'

export interface IIndexPageProps {
  data: {
    content: {
      edges: Array<{
        node: IContentCard
      }>
    }
  }
}

export const IndexPage: React.SFC<IIndexPageProps> = ({ data }) => {
  return (
    <>
      <PageMeta
        title="kommunity - collaboratively building the future of the web"
        metaDescription="Stay up-to-date with quality, community-curated content on relevant topics for the future of web development"
      />
      <Header includeFilter={true} />
      <Directory content={data.content.edges}>
        <div className="home__intro">
          <GatsbyIcon />
          <div>
            <h1>kommunity-curated content on GatsbyJS</h1>
            <p>
              Why count on old fashioned link aggregators when you have
              recommendations by your fellow developers? 😉
            </p>
          </div>
        </div>
      </Directory>
    </>
  )
}

IndexPage.displayName = 'IndexPage'

export default IndexPage

export const pageQuery = graphql`
  {
    content: allKommunityContent(
      sort: { fields: [lastUpdated, contributorCount], order: DESC }
    ) {
      edges {
        node {
          title
          topic
          skillLevel
          format
          url
          recommendations {
            user {
              handle
              fields {
                avatar32
                name
              }
            }
            comment
            twitterUrl
          }
        }
      }
    }
  }
`
