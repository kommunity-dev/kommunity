import { formatCTAs } from '@kompanion/mock-data'
import { IContentCard } from '@kompanion/kommunity-types'
import { extractDomain, textToParagraphs } from '@kompanion/utils'
import * as React from 'react'

import { formatIcons } from './formatIcons'
import { QuoteIcon } from './generalIcons'
import { SkillLevelIndicator } from './levelIcons'

import './styles/content.css'

export interface IContentCardProps extends IContentCard {
  highlightedUser?: string
}

export const ContentCard: React.FunctionComponent<IContentCardProps> = ({
  title,
  recommendations,
  topic,
  url,
  format,
  skillLevel,
  highlightedUser
}) => {
  const { length } = recommendations
  const collaborator =
    typeof highlightedUser === 'string'
      ? recommendations.find(r => r.user.handle === highlightedUser) ||
        recommendations[0]
      : recommendations[0]
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
            Recommended by <b>{length - 1}</b> other{' '}
            {length - 1 === 1 ? 'person' : 'people'}
          </span>
        </footer>
      )}
    </article>
  )
}

ContentCard.displayName = 'ContentCard'

export default ContentCard
