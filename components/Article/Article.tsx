import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ArticleProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  slug: string;
  description: string;
  thumbnail: string;
  tags: string;
  published: boolean;
};

const Article: React.FC<{ article: ArticleProps }> = ({ article }) => {
  const authorName = article.author ? article.author.name : "Unknown author";
  return (
    <>
      <h2>{article.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={article.content} />
      <p>slug: {article.slug}</p>
      <p>description: {article.description}</p>
      <p>thumbnail: {article.thumbnail}</p>
      <p>tags: {article.tags}</p>
    </>
  );
};

export default Article;
