import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const isProduction = this.props.__NEXT_DATA__.runtimeConfig?.DEPLOY_ENV === 'prod'

    return (
      <Html lang='en' dir='ltr' translate='no'>
        <Head>
          <noscript id='jss-insertion-point' />
          <meta charSet='utf-8' />
          <meta httpEquiv='Cache-Control' content='cache, store, must-revalidate' />
          <meta httpEquiv='Pragma' content='no-cache' />
          <meta httpEquiv='Expires' content='0' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='resource-type' content='document' />
          <meta name='distribution' content='global' />
          <meta name='robots' content={isProduction ? 'index,follow' : 'noindex,nofollow'} />
          <meta name='googlebot' content={isProduction ? 'index,follow' : 'noindex,nofollow'} />
          <meta name='revisit-after' content='1 days' />
          <meta name='rating' content='general' />
          <meta name='google' content='notranslate' />
          <link rel='shortcut icon' type='image/png' href='/static/favicon.png' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
