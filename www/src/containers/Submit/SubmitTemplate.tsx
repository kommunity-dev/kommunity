import { Link } from 'gatsby'
import * as React from 'react'
import Head from 'react-helmet'

import { Favicon } from '../../components/Favicon'
import SubmitForm from './SubmitForm'

export const SubmitTemplate: React.SFC<{}> = () => {
  return (
    <>
      <Head>
        <title>Submit your resource to kompanion kommunity</title>
        <meta
          name="description"
          content="Everyone can contribute to the kommunity by sending suggestions of learning resources to other fellow developers 😄"
        />
      </Head>
      <div className="container_md">
        <Link to="/">
          <Favicon
            styles={{
              width: '1.5rem'
            }}
          />
        </Link>
      </div>
      <main className="regular-page container_md">
        <h1>Send your resource</h1>
        <SubmitForm />
      </main>
    </>
  )
}

SubmitTemplate.displayName = 'SubmitTemplate'

export default SubmitTemplate
