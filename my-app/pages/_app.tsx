import { useEffect } from 'react'
import { Provider } from 'react-redux'

import Head from 'next/head'
import type { AppProps } from 'next/app'

import TagManager from 'react-gtm-module'

import config from '../config'
import store from '../store'

import 'antd/dist/antd.css'
import '../styles/variables.less'

import '../styles/lib/reset.min.css'
import '../styles/lib/bootstrap.min.css'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (config.deployEnv === 'production') {
      const tagManagerArgs = { gtmId: config.googleAnalyticsID }
      TagManager.initialize(tagManagerArgs)
    }
  }, [config.deployEnv])

  return (
    <Provider store={store}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, user-scalable=no' />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
