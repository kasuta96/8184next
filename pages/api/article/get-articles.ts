import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const articles = await prisma.article.findMany({
    where: {
      status: 0
    },
    orderBy: {
      id: 'desc',
    },
  });
  res.json(articles)
}