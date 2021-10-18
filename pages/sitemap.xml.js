function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map(({ id, slug, updatedAt }) => {
         return `
       <url>
           <loc>${`${process.env.HOST}/a/${slug}-${id}`}</loc>
           <lastmod>${updatedAt}</lastmod>
       </url>
     `
       })
       .join("")}
   </urlset>
 `
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(`${process.env.HOST}/api/article/sitemap`)
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader("Content-Type", "text/xml")
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default generateSiteMap
