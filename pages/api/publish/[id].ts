import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/db"

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  console.log(session?.user?.role)

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MOD") {
    return res.status(400).json({
      message: "This is protected request",
    })
  }

  const { id, publish } = req.query
  const bl = publish == "true" ? true : false
  console.log("publish", publish)

  try {
    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: { published: !bl },
    })
    return res.status(200).json(article.published)
  } catch (_) {
    return res.status(400).json({
      message: "Unexpected error occurred.",
    })
  }
}
