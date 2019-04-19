import * as React from 'react'

import Header from '../components/Header'
import PageMeta from '../components/PageMeta'

import './regular-page.css'

interface IRegularPage {
  pageContext: {
    frontmatter: {
      [key: string]: any
    }
  }
}

export const RegularPage: React.SFC<IRegularPage> = ({
  children,
  pageContext
}) => {
  const { title, metaDescription } = pageContext.frontmatter
  return (
    <>
      <PageMeta title={title} metaDescription={metaDescription} />
      <Header />
      <main className="regular-page">{children}</main>
    </>
  )
}

RegularPage.displayName = 'RegularPage'

export default RegularPage
