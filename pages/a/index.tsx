import React from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import ArticleCard, { ArticleProps } from "../../components/Article/ArticleCard";
import prisma from '../../lib/db'

export const getStaticProps: GetStaticProps = async () => {
  const articles = await prisma.article.findMany({
    where: {
      status: 0
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
          id: true
        },
      },
    },
  });
  return {
    props: { articles },
  };
};

type Props = {
  articles: ArticleProps[];
};

const Articles: React.FC<Props> = (props) => {
  return (
    <Layout>
        <div>
          {props.articles.map((article) => (
            <div key={article.id} className="" >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
    </Layout>
  );
};

export default Articles;
