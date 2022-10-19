import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document () {
  return (
    <Html>
      <Head />
      <body className="w-full bg-orange-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
