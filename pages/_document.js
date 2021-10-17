import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="canonical" href={process.env.HOST} />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#000000" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta key="theme-color-light" name="theme-color" media="(prefers-color-scheme: light)" content="#1f2937" />
          <meta key="theme-color-dark" name="theme-color" media="(prefers-color-scheme: dark)" content="#f3f4f6" />
        </Head>
        <body className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
