import { capitalizeFirstLetter } from '@kompanion/utils'
import * as React from 'react'

import {
  contentFormats,
  contentLevels,
  contentTopics
} from '@kompanion/mock-data'
import { formatIcons } from '../../components/formatIcons'
import { ChevronIcon } from '../../components/generalIcons'
import LevelCheckbox from '../../components/LevelCheckbox'
import { NavContext } from '../../layouts/LayoutBasis'

export interface IFilterSidebarProps {
  label: any
  checkbox: any
}

export const FilterSidebar: React.SFC<IFilterSidebarProps> = ({
  checkbox,
  label
}) => {
  const ctx = React.useContext(NavContext)
  return (
    <aside
      className={`directory__sidebar sidebar ${
        ctx.filterOpen ? 'sidebar_open' : ''
      }`}
    >
      <header className="sidebar__header">
        <button disabled={!ctx.filterOpen} onClick={ctx.toggleFilters}>
          <ChevronIcon />
        </button>
        <span className="text_right">Filters</span>
      </header>
      <form className="sidebar__content">
        <fieldset>
          <legend>Topics</legend>
          <section className="pill-checkbox__wrapper">
            {contentTopics.map(t => (
              <div className="pill-checkbox text_center" key={t}>
                <input {...checkbox('topics', t)} />
                <label {...label('topics', t)}>{t}</label>
              </div>
            ))}
          </section>
        </fieldset>
        <fieldset>
          <legend>Formats</legend>
          <section className="pill-checkbox__wrapper">
            {contentFormats.map(f => (
              <div className="pill-checkbox pill-checkbox_has-icon" key={f}>
                <input {...checkbox('formats', f)} />
                <label {...label('formats', f)}>
                  {capitalizeFirstLetter(f)} {formatIcons[f]({})}
                </label>
              </div>
            ))}
          </section>
        </fieldset>
        <fieldset>
          <legend>Skill levels</legend>
          {contentLevels
            .filter(l => l !== 'allLevels')
            .map(l => (
              <LevelCheckbox
                key={l}
                level={l}
                label={label}
                checkbox={checkbox}
              />
            ))}
        </fieldset>
      </form>
    </aside>
  )
}

FilterSidebar.displayName = 'FilterSidebar'

export default FilterSidebar
