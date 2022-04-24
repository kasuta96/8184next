function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/html")
  // we send the XML to the browser
  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Check Health</title>
    </head>
    <body>
      Health OK
    </body>
  </html>
  `)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
