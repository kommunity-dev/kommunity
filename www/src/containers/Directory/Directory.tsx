import {
  IContentCard,
  TFormats,
  TSkillLevels,
  TTopics
} from '@kompanion/kommunity-types'
import * as React from 'react'
import { useFormState } from 'react-use-form-state'

import ContentCard from '../../components/ContentCard'
import EmptySearch from './EmptySearch'
import FilterSidebar from './FilterSidebar'

import '../../components/styles/pill-checkbox.css'
import './directory.css'

export interface IDirectoryProps {
  content: Array<{
    node: IContentCard
  }>
}

interface IFilterFields {
  skillLevels: TSkillLevels[]
  topics?: TTopics[]
  formats?: TFormats[]
}

const initialState: IFilterFields = {
  skillLevels: ['advanced', 'beginner', 'intermediate']
}

// TODO: only load the first 20 contents and then fetch from a JSON file somewhere else if the user interacts with the filters ;)

// TODO: consider adding a button to remove all filters
export const Directory: React.FunctionComponent<IDirectoryProps> = ({
  content,
  children
}) => {
  const [filteredContent, setContent] = React.useState(content)
  const [filterState, { checkbox, label }] = useFormState<IFilterFields>(
    initialState,
    {
      withIds: true,
      onChange({ target: { name } }, currState, nextState) {
        if (['formats', 'topics', 'skillLevels'].indexOf(name) >= 0) {
          filterContent(nextState)
        }
      }
    }
  )

  const filterContent = async (nextState: IFilterFields) => {
    const { formats, skillLevels, topics } = nextState
    const newContent = content.filter(({ node }) => {
      if (
        typeof node.skillLevel === 'string' &&
        node.skillLevel !== 'allLevels' &&
        skillLevels.indexOf(node.skillLevel) < 0
      ) {
        return false
      }
      if (
        Array.isArray(formats) &&
        formats.length > 0 &&
        formats.indexOf(node.format) < 0
      ) {
        return false
      }
      if (
        Array.isArray(topics) &&
        topics.length > 0 &&
        topics.indexOf(node.topic) < 0
      ) {
        return false
      }
      return true
    })
    setContent(newContent)
  }

  return (
    <>
      <FilterSidebar label={label} checkbox={checkbox} />
      <main className="directory__main">
        {children}
        <section className="content__wrapper">
          {filteredContent.length > 0 ? (
            filteredContent.map(({ node }) => (
              <ContentCard key={node.url} {...node} />
            ))
          ) : (
            <EmptySearch />
          )}
        </section>
      </main>
    </>
  )
}

Directory.displayName = 'Directory'

export default Directory
