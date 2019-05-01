import { prospectiveTopics } from '@kompanion/mock-data'
import { TTopics } from '@kompanion/kommunity-types'
import {
  Dialog
  // DialogOverlay,
  // DialogContent
} from '@reach/dialog'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import * as React from 'react'
import { useFormState } from 'react-use-form-state'

import { CheckIcon, CrossIcon, MailIcon } from './generalIcons'

import '@reach/dialog/styles.css'

export interface ISubscribeDialogProps {
  isOpen: boolean
  toggleDialog: () => void
}

interface IMailchimpSignupRes {
  result: 'error' | 'success'
  msg: string
}

interface ISubscriptionState {
  subscriptionTopics?: TTopics[]
  subscriptionEmail: string
}

export const SubscribeDialog: React.SFC<ISubscribeDialogProps> = ({
  isOpen,
  toggleDialog
}) => {
  const [formState, { checkbox, label, email }] = useFormState<
    ISubscriptionState
  >(
    { subscriptionEmail: '' },
    {
      withIds: true
    }
  )
  const [isLoading, setLoading] = React.useState(false)
  const [resErr, setRes] = React.useState<string | null>(null)
  const [hadSuccess, setSuccess] = React.useState(false)

  const haveTopics =
    Array.isArray(formState.values.subscriptionTopics) &&
    formState.values.subscriptionTopics.length > 0
  const disableForm = isLoading

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      isLoading ||
      typeof formState.values.subscriptionEmail !== 'string' ||
      !haveTopics
    ) {
      return
    }

    setLoading(true)
    const res: IMailchimpSignupRes = await addToMailchimp(
      formState.values.subscriptionEmail,
      {
        TOPICS: formState.values.subscriptionTopics
      }
    )

    if (res.result === 'success') {
      setSuccess(true)
    } else {
      setRes(res.msg)
    }
    setLoading(false)
  }

  return (
    <Dialog isOpen={isOpen} onDismiss={toggleDialog}>
      <aside className="dialog">
        <button className="dialog__close" onClick={toggleDialog}>
          <CrossIcon />
        </button>
        {hadSuccess ? (
          <>
            <div className="dialog__icon success">
              <CheckIcon fill="var(--successD1)" />
            </div>
            <h1>You're now subscribed! 🎉</h1>
            <p>
              Just make sure to confirm your subscription with the email we've
              sent you ;)
            </p>
            <p>
              <button className="button button_primary" onClick={toggleDialog}>
                Close
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="dialog__icon">
              <MailIcon fill="var(--purple)" />
            </div>
            <h1>Free, personalized content in your inbox</h1>
            <form onSubmit={sendForm}>
              <fieldset disabled={disableForm}>
                <legend>What topics are you interested in?</legend>
                <p
                  className="dialog__input-helper"
                  style={{ marginTop: '1.5rem' }}
                >
                  Choose one or more topics
                </p>
                <section className="pill-checkbox__wrapper">
                  {prospectiveTopics.map(t => (
                    <div key={t} className="pill-checkbox">
                      <input {...checkbox('subscriptionTopics', t)} />
                      <label {...label('subscriptionTopics', t)}>{t}</label>
                    </div>
                  ))}
                </section>
              </fieldset>
              <fieldset
                className="form__group_inline-btn small"
                disabled={!haveTopics || disableForm}
              >
                <label className="dialog__input-helper" {...label('email')}>
                  Email
                </label>
                <input
                  {...email('subscriptionEmail')}
                  className="form__input"
                  placeholder="Ex: john@doe.dev"
                  required={true}
                />
                <button
                  disabled={
                    !haveTopics ||
                    !formState.validity.subscriptionEmail ||
                    disableForm
                  }
                  className="button button_primary"
                  type="submit"
                >
                  Subscribe!
                </button>
              </fieldset>
            </form>
            {typeof resErr === 'string' && (
              <p dangerouslySetInnerHTML={{ __html: resErr }} />
            )}
          </>
        )}
      </aside>
    </Dialog>
  )
}

SubscribeDialog.displayName = 'SubscribeDialog'

export default SubscribeDialog
