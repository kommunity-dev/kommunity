import * as React from 'react'
import Head from 'react-helmet'

import Header from '../components/Header'

import './regular-page.css'

export const RegularPage: React.SFC<{}> = ({ children, pageContext }) => {
  const { title, metaDescription } = pageContext.frontmatter
  return (
    <>
      <Head>
        <title>{title}</title>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
      </Head>
      <Header />
      <main className="regular-page">{children}</main>
    </>
  )
}

RegularPage.displayName = 'RegularPage'

export default RegularPage
