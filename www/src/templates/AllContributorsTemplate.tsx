import { Link } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'

import './all-contributors.css'

export interface IContributorCard {
  handle: string
  fields: {
    avatar100: string
    name: string
    suggestionsCount: number
  }
}

export interface IAllContributorsTemplateProps {
  contributors: Array<{
    node: IContributorCard
  }>
}

export const AllContributorsTemplate: React.SFC<
  IAllContributorsTemplateProps
> = ({ contributors }) => {
  const { length: count } = contributors
  return (
    <>
      <Helmet>
        <title>kommunity contributors</title>
        <meta
          name="description"
          content={`Meet the ${count} people who make it possible`}
        />
      </Helmet>
      <Header />
      <main className="all-contributors">
        <h1>All contributors</h1>
        <p>Thank you all that make Kommunity possible!</p>
        <section className="all-contributors__container">
          {contributors.map(({ node: { handle, fields } }) => (
            <div className="contributor-card" key={handle}>
              <img src={fields.avatar100} alt={`${fields.name}'s picture`} />
              <h2>
                <Link to={`/contributors/${handle}`}>@{handle}</Link>
              </h2>
              <p>{fields.suggestionsCount} suggestions</p>
            </div>
          ))}
        </section>
        <aside>
          <h2>What are you waiting for?</h2>
          <Link to="/contributing" className="button button_primary">
            Contribute!
          </Link>
        </aside>
      </main>
    </>
  )
}

AllContributorsTemplate.displayName = 'AllContributorsTemplate'

export default AllContributorsTemplate
