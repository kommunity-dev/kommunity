import React from 'react'

import PageMeta from './src/components/PageMeta.tsx'
import LayoutBasis from './src/layouts/LayoutBasis.tsx'

export const wrapPageElement = ({ element, props }) => (
  <>
    <PageMeta title="kommunity" />
    <LayoutBasis {...props}>{element}</LayoutBasis>
  </>
)
