import { Link } from 'gatsby'
import * as React from 'react'

import Header from '../components/Header'
import PageMeta from '../components/PageMeta'

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
      <PageMeta
        title="kommunity contributors"
        metaDescription={`Meet the ${count} people who make it possible`}
      />
      <Header />
      <main className="all-contributors">
        <header>
          <h1>All kontributors</h1>
          <p>
            <b>Please note:</b> some of these people are here because we added
            their tweets recommending relevant resources, with the goal of
            making this open-source directory better for other devs. If your
            name is here and you'd like to remove it, please{' '}
            <a href="mailto:hello@kommunity.dev">shoot us an email</a> or
            message us{' '}
            <a
              href="https://twitter.com/kommunityDev"
              target="_blank"
              rel="noopener"
            >
              on Twitter
            </a>
            .
          </p>
        </header>
        <section className="all-contributors__container">
          {contributors.map(({ node: { handle, fields } }) => (
            <div className="contributor-card" key={handle}>
              <img src={fields.avatar100} alt={`${fields.name}'s picture`} />
              <h2>
                <Link to={`/contributors/${handle}`}>{fields.name}</Link>
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
