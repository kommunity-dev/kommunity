import { IContentCard } from '@kompanion/types'
import { textToParagraphs } from '@kompanion/utils'
import { graphql } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Directory from '../containers/Directory/Directory'

export interface IIndexPageProps {
  data: {
    content: {
      edges: Array<{
        node: IContentCard
      }>
    }
  }
}

const firstParagraph = `Learning Gatsby, React and the JAMstack can be fun and more collaborative. Count on valuable, community-curated content as your kompanion.\n__Why count on old fashioned link aggregators when you have recommendations by your fellow developers?__ 😉`

export const IndexPage: React.SFC<IIndexPageProps> = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>kommunity - learning Gatsby can be fun and effective</title>
      </Helmet>
      <Header includeFilter={true} />
      <Directory content={data.content.edges}>
        <div style={{ maxWidth: '600px', fontSize: '.9rem' }}>
          {textToParagraphs(firstParagraph)}
        </div>
      </Directory>
    </>
  )
}

IndexPage.displayName = 'IndexPage'

export default IndexPage

export const pageQuery = graphql`
  {
    content: allKommunityContent {
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
          }
        }
      }
    }
  }
`
