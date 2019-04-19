import * as React from 'react'

import FeedbackDialog from '../components/FeedbackDialog'
import Menu from '../components/Menu'
import SubscribeDialog from '../components/SubscribeDialog'

import '../components/styles/dialog.css'

interface INavState {
  menuOpen: boolean
  filterOpen: boolean
  subscribeOpen: boolean
  feedbackOpen: boolean
}

interface INavContext extends INavState {
  toggleMenu: () => void
  toggleFilters: () => void
  toggleSubscribe: () => void
  toggleFeedback: () => void
}

const initialState: INavState = {
  menuOpen: false,
  filterOpen: false,
  subscribeOpen: false,
  feedbackOpen: false
}

const initialContext: INavContext = {
  ...initialState,
  toggleMenu: () => undefined,
  toggleFilters: () => undefined,
  toggleSubscribe: () => undefined,
  toggleFeedback: () => undefined
}

const hasHtmlEl =
  typeof document !== 'undefined' &&
  typeof document.documentElement !== 'undefined'

// Function to add padding to the HTML
const toggleHtmlPadding = (shouldAdd: boolean, direction: 'right' | 'left') => {
  if (hasHtmlEl) {
    if (shouldAdd) {
      document.documentElement.classList.add(`html_${direction}-sidebar`)
    } else {
      document.documentElement.classList.remove(`html_${direction}-sidebar`)
    }
  }
}

// Used to control the opening of the menu and filter sidebars as well as
// the subscribe modal
export const NavContext = React.createContext<INavContext>(initialContext)

export const LayoutBasis: React.SFC<{}> = ({ children }) => {
  const [navState, setNavState] = React.useState<INavState>(initialState)

  const toggleMenu = () => {
    setNavState({
      ...navState,
      menuOpen: !navState.menuOpen,
      filterOpen: false
    })
    toggleHtmlPadding(!navState.menuOpen, 'right')
    toggleHtmlPadding(false, 'left')
  }
  const toggleFilters = () => {
    setNavState({
      ...navState,
      filterOpen: !navState.filterOpen,
      menuOpen: false
    })
    toggleHtmlPadding(!navState.filterOpen, 'left')
    toggleHtmlPadding(false, 'right')
  }
  const toggleSubscribe = () =>
    setNavState({ ...navState, subscribeOpen: !navState.subscribeOpen })

  const toggleFeedback = () => {
    setNavState({ ...navState, feedbackOpen: !navState.feedbackOpen })
    sessionStorage.setItem('hasPoppedUp', 'true')
  }

  const closeAllSidebars = () => {
    setNavState({ ...navState, filterOpen: false, menuOpen: false })
    toggleHtmlPadding(false, 'right')
    toggleHtmlPadding(false, 'left')
  }

  const navContext: INavContext = {
    ...navState,
    toggleMenu,
    toggleFilters,
    toggleSubscribe,
    toggleFeedback
  }

  React.useEffect(() => {
    const hasPoppedUp = sessionStorage.getItem('hasPoppedUp')
    const feedbackGiven = localStorage.getItem('feedbackGiven')
    if (hasPoppedUp === 'true' || feedbackGiven === 'true') {
      return
    } else {
      const timeToPopUp = window.setTimeout(toggleFeedback, 300000)
      return () => {
        window.clearTimeout(timeToPopUp)
      }
    }
  }, [])

  return (
    <>
      {(navState.menuOpen || navState.filterOpen) && (
        <div
          aria-hidden={true}
          className="modal__backdrop"
          onClick={closeAllSidebars}
        />
      )}
      <FeedbackDialog
        isOpen={navState.feedbackOpen}
        toggleDialog={toggleFeedback}
      />
      <SubscribeDialog
        isOpen={navState.subscribeOpen}
        toggleDialog={toggleSubscribe}
      />
      <NavContext.Provider value={navContext}>
        <>
          <Menu />
          {children}
        </>
      </NavContext.Provider>
    </>
  )
}

LayoutBasis.displayName = 'LayoutBasis'

export default LayoutBasis
