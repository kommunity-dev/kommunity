import React from 'react'
import Helmet from 'react-helmet'

import LayoutBasis from './src/layouts/LayoutBasis.tsx'

import './src/globalStyles/colors.css'
import './src/globalStyles/media.css'
import './src/globalStyles/shadows.css'
import './src/globalStyles/transitions.css'
import './src/globalStyles/typography.css'

import './src/globalStyles/common.css'
import './src/globalStyles/helpers.css'

import './src/components/styles/commonComponents.css'

import favicon from './src/images/favicon.png'

export const wrapPageElement = ({ element, props }) => (
  <>
    <Helmet>
      <link rel="icon" href={favicon} />
      <meta name="robots" content="noindex nofollow" />
    </Helmet>
    <LayoutBasis {...props}>{element}</LayoutBasis>
  </>
)
