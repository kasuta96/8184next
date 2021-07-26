import prisma from './db'

export async function getArticleBySlug(id) {
  const article = await prisma.article.findUnique({
    select: {
      id,
      title,
      slug,
      content,
      tags,
      point,
      createdAt
    },
    where: {
      id: id,
      status: 0
    }
  })
  return article;
}

export async function getAllArticles(fields = []) {
  const articles = await prisma.article.findMany({
    select: {
      slug: true
    },
    where: {
      status: 0
    },
    orderBy: {
      id: 'desc',
    },
  });
  return articles
}