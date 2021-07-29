import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  console.log(req.body);

  const articles = await prisma.article.findMany({
    take: 10,
    where: {
      status: 0,
      published: true
    },
    orderBy: {
      id: 'desc',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnail: true,
      tags: true,
      author: {
        select: {
          name: true,
          id: true,
          image: true
        },
      },
      createdAt: true,
    },
  });

  res.json(articles)
}