import React from 'react'
import Head from 'next/head'

import '../styles/globals.css'

// eslint-disable-next-line react/prop-types
function Application ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tracy Ding&apos;s Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default Application
