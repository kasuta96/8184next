import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'


// DELETE /api/article/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const articleId = req.query.id;
  if (req.method === "DELETE") {
    const article = await prisma.article.delete({
      where: { id: Number(articleId) },
    });
    res.json(article);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
