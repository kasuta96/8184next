import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { getSession } from "next-auth/client";
import slug from "slugify";

import Kuroshiro from "kuroshiro";
// Initialize kuroshiro with an instance of analyzer (You could check the [apidoc](#initanalyzer) for more information):
// For this example, you should npm install and import the kuromoji analyzer first
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
// Instantiate
const kuroshiro = new Kuroshiro();

// POST /api/article
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title, content, description, thumbnail, tags } = req.body;

  const session = await getSession({ req });

  const checkAuthor = async (articleId: any) => {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(articleId),
      },
      select: {
        id: true,
        authorId: true,
      },
    });
    return article?.authorId === session?.id;
  };

  // Initialize
  // Here uses async/await, you could also use Promise
  // *error: Kuroshiro has already been initialized -> fix: only initialize if kuroshiro._analyzer not already
  if (!kuroshiro._analyzer) await kuroshiro.init(new KuromojiAnalyzer());

  const kanjiToRomanji = await kuroshiro.convert(title, { to: "romaji" });

  const contentToSlug = slug(kanjiToRomanji);

  if (req.method === "POST") {
    const data = {
      title: title,
      content: content,
      slug: contentToSlug,
      author: { connect: { id: session?.id as string } },
      description: description,
      thumbnail: thumbnail,
      tags: tags,
      stickers: {},
    };

    if (id) {
      data.stickers = {
        copyright: id,
      };
    }

    const result = await prisma.article.create({
      data: data,
    });
    res.json({
      status: "success",
      route: "/a/" + result.id,
    });
  } else if (req.method === "PUT") {
    // Check article belong to user or not
    const belongsToUser = await checkAuthor(id);
    if (belongsToUser) {
      await prisma.article.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          content: content,
          slug: contentToSlug,
          description: description,
          thumbnail: thumbnail,
          tags: tags,
        },
      });
      res.json({
        status: "success",
        route: "/a/" + id,
      });
    } else {
      res.json({
        status: "error",
        message: "notAuthor",
      });
    }
  }
}
