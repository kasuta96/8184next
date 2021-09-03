import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { getSession } from "next-auth/client";
import slug from "slugify";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

// POST /api/article
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { id, title, content, description, thumbnail, tags } = req.body;

  interface Data {
    id: any;
    title: string;
    content: { blocks: any[] };
    description: string;
    thumbnail: string;
    tags: string;
    slug: string;
  }

  const handleData = async (data: Data) => {
    // if hasn't description -> get first paragraph
    if (!data.description) {
      const firstP = data.content.blocks.find(
        (e: { type: string }) => e.type == "paragraph"
      );
      data.description = firstP?.data.text || "";
    }

    // set default thumbnail: first image on content
    if (!data.thumbnail) {
      const firstImg = data.content.blocks.find(
        (e: { type: string }) => e.type == ("image" || "simpleImage")
      );
      data.thumbnail = firstImg?.data.url || firstImg?.data.file.url || "";
    }

    // Slug
    // Instantiate
    const kuroshiro = new Kuroshiro();
    // Initialize
    // Here uses async/await, you could also use Promise
    // *error: Kuroshiro has already been initialized -> fix: only initialize if kuroshiro._analyzer not already
    if (!kuroshiro._analyzer) await kuroshiro.init(new KuromojiAnalyzer());

    const kanjiToRomanji = await kuroshiro.convert(data.title, {
      to: "romaji",
    });

    data.slug = slug(kanjiToRomanji);

    // More handle data ...

    return data;
  };

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

  if (req.method === "POST") {
    const reqData = await handleData(req.body);
    const { id, title, content, description, thumbnail, tags, slug } = reqData;

    const data = {
      title: title,
      content: content,
      slug: slug,
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
    const reqData = await handleData(req.body);
    const { id, title, content, description, thumbnail, tags, slug } = reqData;

    // Check article belong to user or not
    const belongsToUser = await checkAuthor(id);
    if (belongsToUser) {
      await prisma.article.update({
        where: {
          id: Number(id),
        },
        data: {
          title: title,
          content: content,
          slug: slug,
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
