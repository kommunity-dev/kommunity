import { Link } from 'gatsby'
import * as React from 'react'

import { ChevronIcon, CollaboratorsIcon, MailIcon } from './generalIcons'

import { NavContext } from '../layouts/LayoutBasis'
import { BulbIcon } from './formatIcons'
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
            <div className="hide_large-up">
              <Link
                to="/contributing"
                className="button button_primary menu__cta"
              >
                Contribute
              </Link>
              <button className="menu__link" onClick={toggleSubscribe}>
                <MailIcon /> Subscribe
              </button>
            </div>
            <Link to="/contributors" className="menu__link">
              <CollaboratorsIcon /> All contributors
            </Link>
            <Link to="/about" className="menu__link">
              <BulbIcon /> About
            </Link>
          </div>
          <div className="menu__social-wrapper">
            <a
              href="https://twitter.com/devKommunity"
              target="_blank"
              rel="noopener"
              title="Link to kommunity's Twitter"
            >
              <TwitterIcon />{' '}
            </a>
            <a
              href="https://github.com/kompanion/kommunity"
              target="_blank"
              rel="noopener"
              title="Link to kommunity's GitHub repository"
            >
              <GithubIcon />{' '}
            </a>
            <a href="mailto:hello@kommunity.dev">
              <MailIcon />{' '}
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
