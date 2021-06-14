import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'fontsource-fira-sans/latin.css'

import '../public/static/nprogress.css'
import ErrorPage from './_error'

// Intercept route changes on page navigation to show top edge progress bar
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class MyApp extends App {
  constructor () {
    super(...arguments)
    this.state = {
      hasError: false,
      errorEventId: undefined,
      error: null
    }
  }

  static async getInitialProps ({ Component, ctx }) {
    try {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      return { pageProps }
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      return {
        error: error,
        hasError: true,
      }
    }
  }

  render () {
    return this.state.hasError ? (
      <ErrorPage errorCode={500} errors={this.state.error} />
    ) : (
      // Render the normal Next.js page
      super.render()
    )
  }
}
