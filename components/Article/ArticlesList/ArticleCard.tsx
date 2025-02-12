import React from "react"
import Avatar from "../../Image/Avatar"
import Thumbnail from "../../Image/Thumbnail"
import ArticleOption from "./ArticleOption"
import FormatDate from "../../handleData/FormatDate"
import Link from "next/link"

export type ArticleProps = {
  id: number
  title: string
  author: {
    name: string
    id: string
    image: string
  } | null
  slug: string
  description: string
  thumbnail: string
  tags: string
  createdAt: string
  published: boolean
}

const ArticleCard: React.FC<{ article: ArticleProps }> = ({ article }) => {
  return (
    <div className="flex rounded-lg w-full">
      <div className="flex-shrink-0 mt-4 mr-3 sm:mr-6">
        <Link href={`/a/[slug]`} as={`/a/${article.slug}-${article.id}`} scroll={false}>
          <a
            className="block relative rounded-lg shadow-xl h-24 sm:h-32 md:h-40 w-36 sm:w-48 md:w-60 cursor-pointer"
            aria-label="Thumbnail"
          >
            <Thumbnail id={article.id} image={article.thumbnail} title={article.title} />
          </a>
        </Link>
      </div>
      <div className="p-2 w-full">
        {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div> */}

        <Link href={`/a/[slug]`} as={`/a/${article.slug}-${article.id}`} scroll={false}>
          <a className="block mt-1 sm:text-lg text-700 sm:font-semibold hover:underline cursor-pointer">
            {article.title}
          </a>
        </Link>
        <div className="hidden sm:block">
          <p className="mt-2 text-500 line-3">{article.description}</p>
        </div>
        <div className="mt-2">
          <div className="flex items-center">
            {/* <Avatar image={article.author?.image} name={article.author?.name} size={30} /> */}
            <div className="flex items-center mt-2">
              <a href={"/user/" + article.author.id} className="block relative" aria-label="Avatar">
                <Avatar image={article.author?.image} size={30} name={article.author?.name} />
              </a>
              <div className="flex flex-col justify-between ml-2 text-xs">
                <p className="font-bold text-700">{article.author?.name}</p>
                <p className="text-500">
                  <FormatDate value={article.createdAt} />
                </p>
              </div>
            </div>

            {/* <div className="hidden sm:block ml-2 font-semibold text-gray-700 dark:text-gray-200">
              {article.author?.name || "Unknown"}
            </div> */}
            {/* <span className="flex-none ml-2 text-xs text-gray-600 dark:text-gray-300">
              <FormatDate value={article.createdAt} />
            </span> */}
            <div className="ml-auto flex-none">
              <ArticleOption id={article.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
