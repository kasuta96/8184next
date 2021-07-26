import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export type ArticleProps = {
  id: number;
  title: string;
  author: {
    name: string;
    id: number;
  } | null;
  content: string;
  slug: string;
  description: string;
  thumbnail: string;
  tags: string;
};

const ArticleCard: React.FC<{ article: ArticleProps }> = ({ article }) => {
  return (
    <div onClick={() => Router.push("/a/[id]", `/a/${article.id}`)}>
      <h2>{article.title}</h2>
      {
        article.author
          ?
          <Link href={"/user/" + article.author.id}>
            <a >
              {article.author.name}
            </a>
          </Link>
          :
          "Unknown author"
      }
      <ReactMarkdown children={article.content} />
      <p>slug: {article.slug}</p>
      <p>description: {article.description}</p>
      <p>thumbnail: {article.thumbnail}</p>
      <p>tags: {article.tags}</p>
    </div>
  );
};

export default ArticleCard;
