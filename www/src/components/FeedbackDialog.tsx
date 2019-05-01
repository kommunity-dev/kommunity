import {
  Dialog
  // DialogOverlay,
  // DialogContent
} from '@reach/dialog'
import * as React from 'react'

import '@reach/dialog/styles.css'
import { CrossIcon, QuoteIcon } from './generalIcons'

export interface IFeedbackDialogProps {
  isOpen: boolean
  toggleDialog: () => void
}

export const FeedbackDialog: React.FunctionComponent<IFeedbackDialogProps> = ({
  isOpen,
  toggleDialog
}) => {
  const saveFeedbackToStorage = () => {
    localStorage.setItem('feedbackGiven', 'true')
    toggleDialog()
  }
  return (
    <Dialog style={{ zIndex: 100 }} isOpen={isOpen} onDismiss={toggleDialog}>
      <aside className="dialog">
        <button className="dialog__close" onClick={toggleDialog}>
          <CrossIcon />
        </button>
        <div className="dialog__icon success">
          <QuoteIcon fill="var(--successD1)" />
        </div>
        <h1>Help the kommunity to improve!</h1>
        <p>
          We've prepared a quick feedback form to learn from you and define our
          next steps... Would you mind sparing 5 - 10 minutes of your time to
          fill it out? 😄
        </p>
        <p className="mg-bottom_none">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSduYDNZua0S97QMTByAi5JTxh5KIXLYDFUQcKi9XhSRTANv7Q/viewform?usp=sf_link"
            target="_blank"
            rel="noopener"
            className="button button_primary"
            onClick={saveFeedbackToStorage}
          >
            Give feedback
          </a>
        </p>
      </aside>
    </Dialog>
  )
}

FeedbackDialog.displayName = 'FeedbackDialog'

export default FeedbackDialog
