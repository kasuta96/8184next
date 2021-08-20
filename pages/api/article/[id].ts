import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/db'


// DELETE /api/article/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const articleId = req.query.id

  const checkAuthor = async () => {
    const session = await getSession({ req })
    const article = await prisma.article.findUnique({
      where: {
        id: Number(articleId)
      },
      select: {
        id: true,
        authorId: true
      }
    })
    return article?.authorId === session?.id
  }

  if (req.method === "DELETE") {
    const belongsToUser = await checkAuthor();

    if (belongsToUser) {
      await prisma.article.delete({
        where: {
          id: Number(articleId),
        },
      });
      res.json({
        status: 'success',
      });
    } else {
      res.status(203).json({
        status: 'notAuthor',
      });
    }
  }

  else if (req.method === "GET") {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(articleId) || -1,
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
            image: true,
            id: true
          },
        },
        content: true,
        published: true,
        createdAt: true
      },

    });
    if (article) {
      res.json({
        status: true,
        body: article
      })
    } else {
      res.json({
        status: false
      })
    }

  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
