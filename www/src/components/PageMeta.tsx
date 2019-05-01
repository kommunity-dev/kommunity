import * as React from 'react'
import Helmet from 'react-helmet'

import favicon from '../images/favicon.png'

export interface IPageMetaProps {
  title: string
  metaDescription?: string
  ogType?: 'profile'
  ogImage?: string
}

export const PageMeta: React.SFC<IPageMetaProps> = ({
  title,
  metaDescription,
  ogType = 'website',
  ogImage = 'https://beta.kommunity.dev/base-og-image.png',
  ...props
}) => {
  return (
    <Helmet>
      <link rel="icon" href={favicon} />

      {/* Basic stuff */}
      <title>{title}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}

      {/* Social Media */}
      <meta name="og:type" content={ogType} />
      <meta name="og:site_name" content="kommunity.dev" />
      <meta name="og:title" content={title} />
      {metaDescription && (
        <meta name="og:description" content={metaDescription} />
      )}
      <meta name="og:image" content={ogImage} />
      <meta name="twitter:site" content="@devKommunity" />
      <meta name="twitter:card" content="summary" />
      {props.children}
    </Helmet>
  )
}

PageMeta.displayName = 'PageMeta'

export default PageMeta
