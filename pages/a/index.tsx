import React from "react";
import Layout from "../../components/Layout";
import ArticleCard, { ArticleProps } from "../../components/Article/ArticleCard";
// import { NextApiRequest, NextApiResponse } from 'next'
const { URL, URLSearchParams } = require('url');

export async function getServerSideProps(context: { query: any; }) {

  const fetchUrl = new URL(process.env.NEXTAUTH_URL + '/api/article/get-articles');
  fetchUrl.search = new URLSearchParams(context.query).toString();
  
  const res = await fetch(fetchUrl)
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
