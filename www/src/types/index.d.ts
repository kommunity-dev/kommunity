declare module '@reach/dialog' {
  import React from 'react'

  export type DialogProps = {
    isOpen?: boolean
    onDismiss?: () => void
    children?: React.ReactNode
  } & React.HTMLProps<HTMLDivElement>

  type DialogOverlayProps = {
    initialFocusRef?: React.RefObject<HTMLElement>
  } & DialogProps

  type DialogContentProps = {
    children?: React.ReactNode
  } & React.HTMLProps<HTMLDivElement>

  export const Dialog: React.FunctionComponent<DialogProps>
  export const DialogOverlay: React.FunctionComponent<DialogOverlayProps>
}
