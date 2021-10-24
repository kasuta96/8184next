import { renderToStaticMarkup } from "react-dom/server"

const SitemapIndex = () => null

const Sitemap = ({ pages, origin }) => {
  /*
   * NOTE: <?xml ?> is optional preamble from the spec,
   *  UTF-8 is the default
   *  version 1.0 is the default
   */
  return (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {pages?.map((page, index) => {
        return (
          <url key={index}>
            <loc>{[origin, "a", page?.slug + "-" + page?.id].join("/")}</loc>
            <lastmod>{page?.updatedAt}</lastmod>
          </url>
        )
      })}
    </urlset>
  )
}

export const getServerSideProps = async ({ res }) => {
  const request = await fetch(`${process.env.HOST}/api/article/sitemap`)
  const pages = await request.json()
  const origin = process.env.HOST

  res.setHeader("Content-Type", "text/xml")
  res.write(renderToStaticMarkup(<Sitemap pages={pages} origin={origin} />))
  res.end()

  return {
    props: {},
  }
}

export default SitemapIndex

// export async function getServerSideProps({ res }) {
//   // We make an API call to gather the URLs for our site
//   const request = await fetch(`${process.env.HOST}/api/article/sitemap`)
//   const posts = await request.json()

//   // We generate the XML sitemap with the posts data
//   const sitemap = generateSiteMap(posts)

//   res.setHeader("Content-Type", "text/xml")
//   // we send the XML to the browser
//   res.write(sitemap)
//   res.end()

//   return {
//     props: {},
//   }
// }

// export default SiteMap
