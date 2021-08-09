import React from "react"
import Router from "next/router"
import { formatDaysAgo } from "../../lib/formatDaysAgo"
import Avatar from "../Image/Avatar"
import Thumbnail from "../Image/Thumbnail"

export type ArticleProps = {
  id: number;
  title: string;
  author: {
    name: string;
    id: number;
    image: string;
  } | null;
  slug: string;
  description: string;
  thumbnail: string;
  tags: string;
  createdAt: Date;
};

const ArticleCard: React.FC<{ article: ArticleProps }> = ({ article }) => {
  
  return (

    <div className="sm:flex">
      <div className="sm:flex-shrink-0 px-4 py-2">
        {/* <img className="object-cover rounded-lg shadow-xl h-36 sm:h-40 md:h-44 xl:h-48 w-full sm:w-48 md:w-60 xl:w-72" src={article.thumbnail || "https://picsum.photos/300/200?blur=3&random=" + article.id} alt={article.title} loading="lazy" /> */}
        <div className="rounded-lg shadow-xl h-36 sm:h-40 md:h-44 xl:h-48 w-full sm:w-48 md:w-60 xl:w-72">

          <Thumbnail
            id={article.id}
            image={article.thumbnail}
            title={article.title}
          />

        </div>
      </div>
      <div className="px-4">
        {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div> */}
        <div
          onClick={() => Router.push("/a/[id]", `/a/${article.id}`)}
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline cursor-pointer"
        >{article.title}</div>
        <p className="mt-2 text-gray-500 line-3">{article.description}</p>
        <div className="mt-2">
          <div className="flex items-center">
            <div className="flex items-center">

              <Avatar image={article.author?.image} name={article.author?.name} />
              
              <div className="mx-2 font-semibold text-gray-700 dark:text-gray-200">{article.author?.name || "Unknown"}</div>
            </div>
            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{formatDaysAgo(article.createdAt, 'vi')}</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ArticleCard;
