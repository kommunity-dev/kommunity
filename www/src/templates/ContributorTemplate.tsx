import { IContentCard } from '@kompanion/types'
import { textToParagraphs } from '@kompanion/utils'
import { graphql } from 'gatsby'
import * as React from 'react'

import ContentCard from '../components/ContentCard'
import Header from '../components/Header'
import PageMeta from '../components/PageMeta'
import { GithubIcon } from '../components/socialIcons'

import './contributor-template.css'

export interface IContributorTemplateProps {
  data: {
    contributor: {
      handle: string
      fields: {
        avatar240?: string
        name?: string
        bio?: string
        suggestions: IContentCard[]
      }
    }
  }
}

export const ContributorTemplate: React.SFC<IContributorTemplateProps> = ({
  data: { contributor: contributor }
}) => {
  const { handle } = contributor
  const { name = handle, bio, avatar240, suggestions } = contributor.fields
  const lastName = name.split(' ')[1] || undefined
  return (
    <>
      <PageMeta
        title={`${name} (${handle}) on kommunity`}
        metaDescription={`${name} has ${
          suggestions.length
        } suggestions on kommunity, check all of them out 😉`}
        ogType="profile"
        ogImage={avatar240}
      >
        <meta property="profile:first_name" content={name.split(' ')[0]} />
        {lastName && <meta property="profile:last_name" content={lastName} />}
        <meta property="profile:username" content={handle} />
        <meta property="twitter:creator" content={`@${handle}`} />
      </PageMeta>
      <Header />
      <main className="contributor-template">
        <header>
          <img
            className="contributor__picture"
            src={avatar240}
            alt={`${name}'s profile picture`}
          />
          <h1>{name}</h1>
          <a
            href={`https://github.com/${handle}`}
            target="_blank"
            rel="noopener"
            className="contributor__github-link"
          >
            @{handle} <GithubIcon />
          </a>
          {bio && textToParagraphs(bio)}
        </header>
        <section className="contributor__suggestions">
          <h2>Submitted by {name.split(' ')[0]}</h2>
          <div className="content__wrapper">
            {suggestions.map(s => (
              <ContentCard key={s.url} {...s} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

ContributorTemplate.displayName = 'UserTemplate'

export default ContributorTemplate

export const pageQuery = graphql`
  query ContributorPageQuery($id: String!) {
    contributor: kommunityContributor(id: { eq: $id }) {
      handle
      fields {
        avatar240
        name
        bio
        suggestions {
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
