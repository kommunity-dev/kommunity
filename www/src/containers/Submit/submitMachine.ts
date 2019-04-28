import { assign, Machine } from 'xstate'

interface IMachineContext {
  attempts: number
  canSend: boolean
  url: string
}

interface IMachineSchema {
  states: {
    badUrl: {
      states: {
        noUrl: {}
        fetchingUrl: {}
        urlFetched: {}
      }
    }
    canFillForm: {}
    submitted: {
      states: {
        pending: {}
        error: {}
        manual: {}
        success: {}
      }
    }
  }
}

type TMachineEvents = any

export const formMachine = Machine<
  IMachineContext,
  IMachineSchema,
  TMachineEvents
>({
  key: 'form',
  initial: 'badUrl',
  context: { attempts: 0, canSend: false, url: '' },
  on: {
    UPDATE_URL: {
      target: 'badUrl',
      actions: assign({
        url: (_ctx, e) => {
          console.log(e.value)
          return e.value
        }
      })
    }
  },
  states: {
    badUrl: {
      initial: 'noUrl',
      onDone: 'canFillForm',
      states: {
        noUrl: {
          on: {
            FETCH: 'fetchingUrl'
          }
        },
        fetchingUrl: {
          onEntry: console.log('trying to get the URL'),
          on: {
            RESOLVE: 'urlFetched',
            REJECT: 'noUrl'
          }
        },
        urlFetched: {
          type: 'final'
        }
      }
    },
    canFillForm: {
      on: {
        VALIDATE: {
          actions: assign({ canSend: ctx => !ctx.canSend })
        },
        SUBMIT: {
          target: 'submitted',
          cond: 'canSend'
        }
      }
    },
    submitted: {
      initial: 'pending',
      states: {
        pending: {
          onEntry: assign({
            attempts: ctx => ctx.attempts + 1
          }),
          on: {
            RESOLVE: 'success',
            REJECT: 'error',
            BACK: undefined
          }
        },
        error: {
          on: {
            RETRY: {
              target: 'pending',
              cond: 'canRetry'
            },
            '': {
              target: 'manual',
              cond: 'goToManual'
            }
          }
        },
        manual: {},
        success: {}
      },
      on: {
        BACK: 'canFillForm'
      }
    }
  }
})
