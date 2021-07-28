import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'
import { getSession } from 'next-auth/client'
import slug from 'slugify'

import Kuroshiro from "kuroshiro";
// Initialize kuroshiro with an instance of analyzer (You could check the [apidoc](#initanalyzer) for more information):
// For this example, you should npm install and import the kuromoji analyzer first
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
// Instantiate
const kuroshiro = new Kuroshiro();

// POST /api/article
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  const session = await getSession({ req });

  // Initialize
  // Here uses async/await, you could also use Promise
  await kuroshiro.init(new KuromojiAnalyzer());

  const kanjiToRomanji = await kuroshiro.convert(title, { to: "romaji" });

  const contentToSlug = slug(kanjiToRomanji);
  
  const result = await prisma.article.create({
    data: {
      title: title,
      content: content,
      slug: contentToSlug,
      author: { connect: { id: session?.id as string } },
    },
  });
  res.json(result);
}
