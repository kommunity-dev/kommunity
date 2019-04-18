// TODO: fix warning for the got package
// "Critical dependency: the request of a dependency is an expression"
import * as got from 'got'

/* tslint:disable */
const metascraper = require('metascraper')([
  require('metascraper-title')()
])
/* tslint:enable */

interface IScraperReturn {
  title: string;
}

// interface IScraperError {
//   error: string;
// }

// TODO: fix the type definition for this return
// for some reason TS is yelling at me under handler.ts
// saying meta.error | meta.title don't existe 🤔
const getUrlMeta = async (targetUrl: string): Promise<IScraperReturn | any> => {
  try {
    const { body: html, url } = await got(targetUrl)
    const metadata: IScraperReturn = await metascraper({ html, url })
    return metadata
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export default getUrlMeta
