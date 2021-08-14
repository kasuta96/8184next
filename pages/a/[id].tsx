import React from "react"
import { GetServerSideProps } from "next"
import ErrorPage from 'next/error'
import Layout from "../../components/Layout"
import ArticlePage, { ArticleProps } from "../../components/Article/Article"
import prisma from '../../lib/db'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const article = await prisma.article.findUnique({
    where: {
      id: Number(params?.id) || -1,
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
      content:true,
      published:true,
      createdAt: true
    },

  });
  if (article) {
    return {
      props: article,
    };
  } else {
    return {
      props: {
        status: '404'
      }
    }
  }
};

const Article: React.FC<ArticleProps> = (props) => {

  if (props?.status == '404') {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        <ArticlePage article={props} />
      </div>
    </Layout>
  );
};

export default Article;
