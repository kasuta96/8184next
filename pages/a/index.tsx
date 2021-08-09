import React from "react";
// import { useRouter } from 'next/router'
import Layout from "../../components/Layout";
import ArticleCard, { ArticleProps } from "../../components/Article/ArticleCard";
// import { NextApiRequest, NextApiResponse } from 'next'

export async function getServerSideProps(context: { query: any; }) {
  
  console.log(context.query);

  const res = await fetch(process.env.NEXTAUTH_URL + '/api/article/get-articles')
  const articles = await res.json()

  if (!articles) {
    return {
      notFound: true,
    }
  }

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
      <div className="space-y-8 py-10 w-full max-w-4xl mx-auto">
        {props.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Layout>
  );
};

export default Articles;
