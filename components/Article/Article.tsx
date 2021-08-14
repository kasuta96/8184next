import React from "react"
import Thumbnail from "../Image/Thumbnail"
import Avatar from "../Image/Avatar"
import { formatDaysAgo } from "../../lib/formatDaysAgo"
import ArticleContent from "./ArticleContent"
import Tags from "./Tags"
import ArticleReact from "../../components/Reaction/Article"

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
  status: string;
};

const ArticlePage: React.FC<{ article: ArticleProps }> = ({ article }) => {
  let authorName = article.author ? article.author.name : "Unknown author";
  let title = article.title;
  if (!article.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div className="px-3">
      <div className="rounded-lg shadow-xl h-60 sm:h-64 md:h-72 xl:h-80 w-full">
        <Thumbnail image={article.thumbnail} />
      </div>
      <h4 className="pt-4">{title}</h4>

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

      {article.tags
        &&
        <Tags tags={article.tags} />
      }

      <ArticleReact authorId={article.author.id} articleId={article.id} />

      <p>id: {article.id}</p>

    </div>
  );
};

export default ArticlePage;
