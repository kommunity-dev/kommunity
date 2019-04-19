import { Link } from 'gatsby'
import * as React from 'react'

import RegularPage from '../layouts/RegularPage'

export const NotFoundPage: React.SFC<{}> = props => {
  return (
    <RegularPage
      pageContext={{
        frontmatter: {
          title: 'Page not found!',
          metaDescription: "We're sorry, but this page doesn't exist 😔"
        }
      }}
    >
      <h1>Uh oh, we're mourning 🤧</h1>
      <p>
        This page, which represented everyone's dream, was nothing but an
        illusion... it never was, and maybe never will be...
      </p>
      <img
        style={{
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto',
          display: 'block'
        }}
        src="https://media.giphy.com/media/26hkhPJ5hmdD87HYA/giphy.gif"
        alt="GIF of Sylvester from Looney Tunes searching in empty kitchen cupboards."
      />
      <p>
        But rest assured that you can always go back to{' '}
        <Link to="/">your home</Link> and enjoy the warmth of kommunity 😉
      </p>
    </RegularPage>
  )
}

NotFoundPage.displayName = 'NotFoundPage'

export default NotFoundPage
