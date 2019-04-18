import { TSkillLevels } from '@kompanion/types'
import * as React from 'react'

import { CheckIcon } from './generalIcons'
import { SkillLevelIndicator } from './levelIcons'

import './styles/level-checkbox.css'

export interface ILevelCheckboxProps {
  level: TSkillLevels
  // TODO: typechecking
  label: any
  checkbox: any
}

// TODO: SVG check on checkbox active
export const LevelCheckbox: React.SFC<ILevelCheckboxProps> = ({
  level,
  label,
  checkbox
}) => {
  return (
    <div className="level-checkbox">
      <input {...checkbox('skillLevels', level)} />
      <label {...label('skillLevels', level)}>
        <div aria-hidden={true} className="level-checkbox__indicator">
          <CheckIcon />
        </div>
        <SkillLevelIndicator level={level} />
      </label>
    </div>
  )
}

LevelCheckbox.displayName = 'LevelCheckbox'

export default LevelCheckbox
