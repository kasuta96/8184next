import { NextApiRequest, NextApiResponse } from "next"
import { writeFileSync } from "fs"
import prisma from "../../../lib/db"

const homeURL = process.env.HOST

export default async function Sitemap(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pages = await prisma.article.findMany({
      where: {
        status: 0,
      },
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .map((page) => {
        let fullUrl = [homeURL, "a", page?.slug + "-" + page?.id].join("/")
        return `<url><loc>${fullUrl}</loc></url><lastmod>${page.updatedAt.toISOString().slice(0, 10)}</lastmod>`
      })
      .join("")}</urlset>`

    writeFileSync("../../../public/sitemap.xml", sitemap)

    return res.status(200).json({ message: "sitemap generated" })
  } catch (e) {
    return res.status(500).json({ message: e })
  }
}
