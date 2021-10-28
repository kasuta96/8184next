const homeURL = "https://8184.vercel.app"

function generateSiteMap(pages) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .map((page) => {
      let fullUrl = [homeURL, "a", page?.slug + "-" + page?.id].join("/")
      return `<url><loc>${fullUrl}</loc><lastmod>${page.updatedAt.split("T")[0]}</lastmod></url>`
    })
    .join("")}</urlset>`

  return sitemap
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(`${homeURL}/api/article/sitemap`)
  const pages = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(pages)

  res.setHeader("Content-Type", "text/xml")
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
