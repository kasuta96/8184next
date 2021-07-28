import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const articleId = req.query.id;
  const article = await prisma.article.update({
    where: { id: Number(articleId) },
    data: { published: true },
  });
  res.json(article);
}
