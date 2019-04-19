import { graphql } from 'gatsby'
import * as React from 'react'
import AllContributorsTemplate, {
  IContributorCard
} from '../templates/AllContributorsTemplate'

export interface IContributorsPageProps {
  data: {
    contributors: {
      edges: Array<{
        node: IContributorCard
      }>
    }
  }
}

export const ContributorsPage: React.SFC<IContributorsPageProps> = ({
  data: { contributors }
}) => <AllContributorsTemplate contributors={contributors.edges} />

ContributorsPage.displayName = 'ContributorsPage'

export default ContributorsPage

export const pageQuery = graphql`
  query ContributorsPageQuery {
    contributors: allKommunityContributor {
      edges {
        node {
          handle
          fields {
            avatar32
            name
            suggestionsCount
          }
        }
      }
    }
  }
`
