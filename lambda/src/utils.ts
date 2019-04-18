import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { Handler } from 'aws-lambda'

export const applyMiddlewares = (handler: Handler): middy.IMiddy => {
  return middy(handler)
    .use(
      cors({
        origins: ['http://localhost:8000']
      })
    )
    .use(httpJsonBodyParser())
    .use({ after: stringifyReturnBody })
}

export const stringifyReturnBody: any = (handler, next) => {
  if (handler.response && typeof handler.response.body === 'object') {
    handler.response.body = JSON.stringify(handler.response.body)
  }
  next()
}
