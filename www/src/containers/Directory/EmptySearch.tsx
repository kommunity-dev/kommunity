import * as React from 'react'
import { SearchCloudIcon } from '../../components/generalIcons'
import { NavContext } from '../../layouts/LayoutBasis'

export const EmptySearch: React.SFC<{}> = () => {
  const { toggleFilters, filterOpen } = React.useContext(NavContext)
  return (
    <section className="directory__empty-search">
      <SearchCloudIcon />
      <p>No resources found.</p>
      <p>
        Maybe{' '}
        {filterOpen ? (
          'try different filters'
        ) : (
          <button
            style={{ color: 'var(--purple)', fontSize: 'inherit', margin: 0 }}
            onClick={toggleFilters}
          >
            try different filters
          </button>
        )}
        ?
      </p>
    </section>
  )
}

EmptySearch.displayName = 'EmptySearch'

export default EmptySearch
