import React from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import ArticleCard, { ArticleProps } from "../../components/Article/ArticleCard";
import prisma from '../../lib/db'

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch(process.env.NEXTAUTH_URL+'/api/article/get-articles')
  const articles = await res.json()

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
        <div className="space-y-12 py-10 max-w-4xl mx-auto">
          {props.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
    </Layout>
  );
};

export default Articles;
