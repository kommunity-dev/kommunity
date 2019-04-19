import { IContentCard } from '@kompanion/types'
import { textToParagraphs } from '@kompanion/utils'
import { graphql } from 'gatsby'
import * as React from 'react'

import Header from '../components/Header'
import PageMeta from '../components/PageMeta'
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

const firstParagraph = `Count on valuable, kommunity-curated content as your kompanion in **creating the web of the future**.\n__Why count on old fashioned link aggregators when you have recommendations by your fellow developers?__ 😉`

export const IndexPage: React.SFC<IIndexPageProps> = ({ data }) => {
  return (
    <>
      <PageMeta
        title="kommunity - collaboratively building the future of the web"
        metaDescription="Stay up-to-date with quality, community-curated content on relevant topics for the future of web development"
      />
      <Header includeFilter={true} />
      <Directory content={data.content.edges}>
        <div style={{ maxWidth: '560px', fontSize: '.9rem' }}>
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
