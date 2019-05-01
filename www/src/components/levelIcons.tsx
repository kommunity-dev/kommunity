import { TSkillLevels } from '@kompanion/kommunity-types'
import { readableLevels } from '@kompanion/mock-data'
import * as React from 'react'

import './styles/skill-level.css'

export const WinkEmoji = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="var(--purple)"
  >
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.508 13.941c-1.513 1.195-3.174 1.931-5.507 1.931-2.335 0-3.996-.736-5.509-1.931l-.492.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.492-.493zm-9.008-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm9.5 2.002l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002z" />
  </svg>
)

export const LevelIcon: React.FunctionComponent<{ level: TSkillLevels }> = ({
  level
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '65%' }}
  >
    <g clipPath="url(#level-icon__clip)" fillRule="evenodd" clipRule="evenodd">
      <path
        d="M11.2904 58.0649c6.2355 0 11.2904 5.0549 11.2904 11.2904v19.3549c0 6.2355-5.0549 11.2908-11.2904 11.2908C5.05488 100.001 0 94.9457 0 88.7102V69.3553c0-6.2355 5.05488-11.2904 11.2904-11.2904z"
        fill="var(--purpleD1)"
      />
      <path
        d="M50 29.0324c6.2355 0 11.2904 5.0549 11.2904 11.2904v48.3874c0 6.2355-5.0549 11.2908-11.2904 11.2908s-11.2904-5.0553-11.2904-11.2908V40.3228c0-6.2355 5.0549-11.2904 11.2904-11.2904z"
        fill={level === 'beginner' ? 'white' : 'var(--purpleD1)'}
      />
      <path
        d="M88.7096 0C94.9451 0 100 5.05488 100 11.2904v77.4197c0 6.2355-5.0549 11.2909-11.2904 11.2909s-11.2904-5.0554-11.2904-11.2909V11.2904C77.4192 5.05488 82.4741 0 88.7096 0z"
        fill={level === 'advanced' ? 'var(--purpleD1)' : 'white'}
      />
    </g>
    <defs>
      <clipPath id="level-icon__clip">
        <path fill="#fff" d="M0 0h100v100H0z" />
      </clipPath>
    </defs>
  </svg>
)

export const skillLevelIcon = {
  beginner: () => <LevelIcon level="beginner" />,
  intermediate: () => <LevelIcon level="intermediate" />,
  advanced: () => <LevelIcon level="advanced" />,
  allLevels: () => <WinkEmoji />
}

export const SkillLevelIndicator: React.FunctionComponent<{
  level: TSkillLevels
}> = ({ level }) => (
  <div className="skill-level">
    {readableLevels[level]} <span>{skillLevelIcon[level]()}</span>
  </div>
)
