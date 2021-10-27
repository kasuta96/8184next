import { writeFileSync } from "fs"
import axios from "axios"
const homeURL = "https://8184.vercel.app"

async function Sitemap() {
  try {
    console.log("generating sitemap..")

    const request = await axios(`${homeURL}/api/article/sitemap`)
    const pages = await request.data

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .map((page) => {
        let fullUrl = [homeURL, "a", page?.slug + "-" + page?.id].join("/")
        return `<url><loc>${fullUrl}</loc></url><lastmod>${page.updatedAt.split("T")[0]}</lastmod>`
      })
      .join("")}</urlset>`

    writeFileSync("public/sitemap.xml", sitemap)

    console.log("sitemap generated")
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

Sitemap()
