import { formatCTAs } from '@kompanion/mock-data'
import { IContentCard } from '@kompanion/types'
import { extractDomain, textToParagraphs } from '@kompanion/utils'
import * as React from 'react'

import { formatIcons } from './formatIcons'
import { QuoteIcon } from './generalIcons'
import { SkillLevelIndicator } from './levelIcons'

import './styles/content.css'

export const ContentCard: React.SFC<IContentCard> = ({
  title,
  recommendations,
  topic,
  url,
  format,
  skillLevel
}) => {
  const { length } = recommendations
  const collaborator = recommendations[0]
  const {
    handle,
    fields: { name, avatar32: avatarUrl }
  } = collaborator.user
  return (
    <article className="content__card">
      <header>
        <section className="content__meta">
          <span className="content__topic">{topic}</span>
          {skillLevel && <SkillLevelIndicator level={skillLevel} />}
        </section>
        <a href={url} target="_blank" rel="noopener" className="content__title">
          <h2>{title}</h2>
        </a>
        {/* TODO: Regex */}
        <span className="content__domain">
          {formatIcons[format]({})} <strong>{formatCTAs[format]}:</strong>{' '}
          <a href={url} target="_blank" rel="noopener">
            {extractDomain(url)}
          </a>
        </span>
      </header>
      <main>
        <span className="content__quote" aria-hidden={true}>
          <QuoteIcon />
        </span>
        {textToParagraphs(collaborator.comment)}
      </main>
      <address>
        <a className="content__author" href={`/contributors/${handle}`}>
          <img
            src={avatarUrl}
            alt={`Profile picture from ${name}`}
            className="content__photo"
          />
          {name}{' '}
          {collaborator.twitterUrl && (
            <a
              className="content__via-twitter"
              href={collaborator.twitterUrl}
              target="_blank"
              rel="noopener"
            >
              - via Twitter
            </a>
          )}
        </a>
      </address>
      {length > 1 && (
        <footer>
          <span className="content__recommended-by">
            Recommended by <b>{length}</b> other people
          </span>
        </footer>
      )}
    </article>
  )
}

ContentCard.displayName = 'ContentCard'

export default ContentCard
