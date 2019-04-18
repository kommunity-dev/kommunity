import { Link } from 'gatsby'
import * as React from 'react'

import { ChevronIcon, CollaboratorsIcon, MailIcon } from './generalIcons'

import { NavContext } from '../layouts/LayoutBasis'
import { GithubIcon, TwitterIcon } from './socialIcons'

import './styles/menu.css'

export const Menu: React.SFC<{}> = () => {
  const { toggleMenu, menuOpen, toggleSubscribe } = React.useContext(NavContext)
  return (
    <aside className={`menu sidebar ${menuOpen ? 'sidebar_open' : ''}`}>
      <header className="sidebar__header">
        <span>Menu</span>
        <button disabled={!menuOpen} onClick={toggleMenu}>
          <ChevronIcon />
        </button>{' '}
      </header>
      <main className="sidebar__content">
        <nav className="menu__nav">
          <div>
            <div className="hide_note-up">
              <button
                className="button button_secondary hide_noteUp"
                onClick={toggleSubscribe}
              >
                Subscribe
              </button>
              <Link
                to="/contributing"
                className="button button_primary hide_noteUp"
              >
                Contribute
              </Link>
            </div>
            <Link
              to="/contributors"
              className="menu__link menu__link_highlight"
            >
              <CollaboratorsIcon />{' '}
              <span className="menu__link-title">All contributors</span>
            </Link>
          </div>
          <div>
            <a
              href="https://twitter.com/kommunityDev"
              target="_blank"
              rel="noopener"
              className="menu__link"
            >
              <TwitterIcon />{' '}
              <span>
                <span className="menu__link-title">Follow kompanion</span>
                <span>We’ll be posting updates and new links</span>
              </span>
            </a>
            <a
              href="https://github.com/kompanion/kompanion"
              target="_blank"
              rel="noopener"
              className="menu__link"
            >
              <GithubIcon />{' '}
              <span>
                <span className="menu__link-title">Github</span>
                <span>All of our code is open source 😁</span>
              </span>
            </a>
            <a href="mailto:hello@kommunity.dev" className="menu__link">
              <MailIcon />{' '}
              <span>
                <span className="menu__link-title">Say hi!</span>
                <span>Any feedbacks? How can we better help you?</span>
              </span>
            </a>
          </div>
          <p style={{ marginBottom: '1rem', fontSize: '.9em' }}>
            Made with 💜 by{' '}
            <a href="https://kaordica.design" target="_blank" rel="noopener">
              Kaordica
            </a>{' '}
            with{' '}
            <a href="https://gatsbyjs.org" target="_blank" rel="noopener">
              GatsbyJS
            </a>
          </p>
        </nav>
      </main>
    </aside>
  )
}

Menu.displayName = 'Menu'

export default Menu
