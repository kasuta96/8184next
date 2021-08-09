import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  console.log('params', req.query);
  const kw = req?.query?.kw?.toString() || '';

  const articles = await prisma.article.findMany({
    take: 10,
    where: {
      status: 0,
      // published: true,
      OR: [
        {
          title: {
            contains: kw
          }
        },
        {
          tags: {
            contains: kw
          }
        }
      ]
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