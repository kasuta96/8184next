import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page || 1;
  const articles = await prisma.article.findMany({
    skip: (+page - 1) * 10,
    take: 10,
    where: {

    },
    orderBy: {
      id: 'desc',
    },
  });
  res.json(articles)
}