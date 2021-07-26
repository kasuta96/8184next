import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'
import { getSession } from 'next-auth/client'
import slug from 'limax';

// POST /api/article
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  const session = await getSession({ req });

  const result = await prisma.article.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
