import React from "react"
import Router from "next/router"
import Thumbnail from "../Image/Thumbnail"
import Avatar from "../Image/Avatar"
import { formatDaysAgo } from "../../lib/formatDaysAgo"
import ArticleContent from "./ArticleContent"

export type ArticleProps = {
  id: number;
  title: string;
  author: {
    name: string;
    image: string;
    id: string;
  } | null;
  content: object;
  slug: string;
  description: string;
  thumbnail: string;
  tags: string;
  published: boolean;
  createdAt: Date;
};

const ArticlePage: React.FC<{ article: ArticleProps }> = ({ article }) => {
  const authorName = article.author ? article.author.name : "Unknown author";

  return (
    <div className="px-3">
      <div className="rounded-lg shadow-xl h-60 sm:h-64 md:h-72 xl:h-80 w-full">
        <Thumbnail image={article.thumbnail} />
      </div>
      <h4 className="pt-4">{article.title}</h4>

      <div className="flex items-center mt-4">
        <a href={"/user/" + article.author.id} className="block relative">
          <Avatar
            image={article.author.image}
            name={authorName}
          />
        </a>
        <div className="flex flex-col justify-between ml-4 text-sm">
          <p className="text-gray-800 dark:text-white">
            {authorName}
          </p>
          <p className="text-gray-400 dark:text-gray-300">
            {formatDaysAgo(article.createdAt)}
          </p>
        </div>
      </div>

      <ArticleContent data={article.content} />
      {/* <p>{JSON.stringify(article.content)}</p> */}
      <p>tags: {article.tags}</p>
    </div>
  );
};

export default ArticlePage;
