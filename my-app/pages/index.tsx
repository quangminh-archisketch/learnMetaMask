import { Fragment } from 'react'
import Head from 'next/head'
import { PageContent } from '../styles/__styles'
import HeaderPageFragment from '../component/fragments/HeaderPage'
import withAuth from '../lib/withAuth'
import withLayout from '../lib/withLayout'

const HomePage = () => {
  return (
    <Fragment>
      <Head>
        <title>Market Place Admin</title>
      </Head>
      <>
        <HeaderPageFragment fullWidth title='Dashboard' />
        <PageContent noCustom>{/* <DashboardComponent /> */}</PageContent>
      </>
    </Fragment>
  )
}

export default withAuth(withLayout(HomePage, { sidebar: { selectedKey: 'dashboard' } }))
