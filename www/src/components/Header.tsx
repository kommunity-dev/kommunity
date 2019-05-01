import { Link } from 'gatsby'
import * as React from 'react'

import { Favicon } from './Favicon'

import { NavContext } from '../layouts/LayoutBasis'
import { FilterIcon, MenuIcon } from './generalIcons'

import './styles/header.css'
import { GithubIcon } from './socialIcons'

export interface IHeaderProps {
  includeFilter?: boolean
  includeMenu?: boolean
  includeSubscribe?: boolean
}

export const Header: React.FunctionComponent<IHeaderProps> = ({
  includeFilter = false,
  includeMenu = true,
  includeSubscribe = true
}) => {
  const ctx = React.useContext(NavContext)
  return (
    <header className="header">
      {includeFilter && (
        <button
          className={`header__sidebar-button ${
            !ctx.filterOpen ? '' : 'disabled'
          }`}
          onClick={ctx.toggleFilters}
          title="Open the search filters"
        >
          <FilterIcon />
        </button>
      )}
      <nav className="header__nav">
        <Link to="/" className="header__home">
          <Favicon />{' '}
          <span>
            kommunity.dev <i>v0.1</i>
          </span>
        </Link>
        {/* TODO: TEXT SEARCH HERE */}
        <div className="header__links hide_sm-than-large">
          {includeSubscribe && (
            <button
              className="button button_secondary"
              onClick={ctx.toggleSubscribe}
            >
              Subscribe
            </button>
          )}
          <Link to="/contributing" className="button button_primary">
            Contribute
          </Link>
          <a
            href="https://github.com/kompanion/kommunity"
            target="_blank"
            rel="noopener"
            className="hide_phone header__github"
            title="Link to kommunity's GitHub repository"
          >
            <GithubIcon />{' '}
          </a>
        </div>
      </nav>
      {includeMenu && (
        <button
          className={`header__sidebar-button ${
            !ctx.menuOpen ? '' : 'disabled'
          }`}
          disabled={ctx.menuOpen}
          onClick={ctx.toggleMenu}
          title="Open the menu"
        >
          <MenuIcon />
        </button>
      )}
    </header>
  )
}

Header.displayName = 'Header'

export default Header
