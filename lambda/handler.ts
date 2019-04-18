import { ISubmissionPayload } from '@kompanion/types'
import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import getUrlMeta from './src/getUrlMeta'
import { submitRec } from './src/submitRec'
import { applyMiddlewares } from './src/utils'

export const fetchUrl: APIGatewayProxyHandler = async event => {
  const query = event.queryStringParameters
  if (query === null || typeof query.url !== 'string') {
    return {
      statusCode: 400,
      body: 'Missing URL query parameter'
    }
  }
  try {
    const meta = await getUrlMeta(query.url)
    console.log(meta)
    if (meta.error) {
      return {
        statusCode: 400,
        body: JSON.stringify(meta.error)
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(meta)
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

type TSubmitBody = null | Partial<ISubmissionPayload>

export const submitResource = applyMiddlewares(async event => {
  const payload: TSubmitBody = event.body
  return submitRec(payload)
})

// export const submitHandler = middy(submitResource)
//   .use(
//     cors({
//       origins: ['http://localhost:8000']
//     })
//   )
//   .use(httpJsonBodyParser())
