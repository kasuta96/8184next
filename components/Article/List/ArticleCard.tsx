import React from "react"
import { useRouter } from "next/router"
import Avatar from "../../Image/Avatar"
import Thumbnail from "../../Image/Thumbnail"
import ArticleOption from "./ArticleOption"
import FormatDate from "../../handleData/FormatDate"

export type ArticleProps = {
  id: number
  title: string
  author: {
    name: string
    id: number
    image: string
  } | null
  slug: string
  description: string
  thumbnail: string
  tags: string
  createdAt: Date
}

const ArticleCard: React.FC<{ article: ArticleProps }> = ({ article }) => {
  const router = useRouter()

  return (
    <div className="sm:flex rounded-lg">
      <div className="sm:flex-shrink-0 p-2 mr-4">
        <div
          onClick={() => {
            article.slug
              ? router.push("/a/[slug]", `/a/${article.slug}-${article.id}`)
              : router.push("/a/preview/[id]", `/a/preview/${article.id}`)
          }}
          className="rounded-lg shadow-xl h-36 sm:h-40 md:h-44 xl:h-48 w-full sm:w-48 md:w-60 xl:w-72 cursor-pointer"
        >
          <Thumbnail id={article.id} image={article.thumbnail} title={article.title} />
        </div>
      </div>
      <div className="p-2 w-full">
        {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div> */}
        <div
          onClick={() => {
            article.slug
              ? router.push("/a/[slug]", `/a/${article.slug}-${article.id}`)
              : router.push("/a/preview/[id]", `/a/preview/${article.id}`)
          }}
          className="block mt-1 text-lg leading-tight font-semibold hover:underline cursor-pointer"
        >
          {article.title}
        </div>
        <p className="mt-2 text-500 line-3">{article.description}</p>
        <div className="mt-2">
          <div className="flex items-center">
            <div className="flex-none">
              <Avatar image={article.author?.image} name={article.author?.name} />
            </div>

            <div className="mx-2 font-semibold text-gray-700 dark:text-gray-200">
              {article.author?.name || "Unknown"}
            </div>
            <span className="flex-none mx-1 text-xs text-gray-600 dark:text-gray-300">
              <FormatDate value={article.createdAt} />
            </span>
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
