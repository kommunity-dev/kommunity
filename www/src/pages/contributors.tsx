import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'

export interface IContributorsPageProps {
  data: {
    contributors: {
      edges: Array<{
        node: {
          handle: string
          fields: {
            avatar32: string
            name: string
            suggestionsCount: number
          }
        }
      }>
    }
  }
}

export const ContributorsPage: React.SFC<IContributorsPageProps> = ({
  data: { contributors }
}) => {
  const { length } = contributors.edges
  return (
    <>
      <Helmet>
        <title>kommunity contributors</title>
        <meta
          name="description"
          content={`Meet the ${length} people who make it possible`}
        />
      </Helmet>
      <Header />
      <main>
        <h1>All contributors</h1>
        <p>Thank you all that make Kommunity possible!</p>
        <section>
          {contributors.edges.map(({ node: { handle, fields } }) => (
            <div key={handle}>
              <img src={fields.avatar32} alt={`${fields.name}'s picture`} />
              <h2>
                <Link to={`/contributors/${handle}`}>{handle}</Link>
              </h2>
              <p>{fields.suggestionsCount} suggestions</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

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
