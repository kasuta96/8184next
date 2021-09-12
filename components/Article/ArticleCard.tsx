import React from "react"
import Router from "next/router"
import { formatDaysAgo } from "../../lib/formatDaysAgo"
import Avatar from "../Image/Avatar"
import Thumbnail from "../Image/Thumbnail"
import { DotsHorizontalIcon } from "@heroicons/react/outline"
import Dropdown from "../Dropdowns/Dropdown"

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
  return (
    <div className="sm:flex rounded-lg">
      <div className="sm:flex-shrink-0 p-2 mr-4">
        <div
          onClick={() => Router.push("/a/[id]", `/a/${article.id}`)}
          className="rounded-lg shadow-xl h-36 sm:h-40 md:h-44 xl:h-48 w-full sm:w-48 md:w-60 xl:w-72 cursor-pointer"
        >
          <Thumbnail
            id={article.id}
            image={article.thumbnail}
            title={article.title}
          />
        </div>
      </div>
      <div className="p-2 w-full">
        {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div> */}
        <div
          onClick={() => Router.push("/a/[id]", `/a/${article.id}`)}
          className="block mt-1 text-lg leading-tight font-semibold hover:underline cursor-pointer"
        >
          {article.title}
        </div>
        <p className="mt-2 text-500 line-3">{article.description}</p>
        <div className="mt-2">
          <div className="flex items-center">
            <div className="flex-none">
              <Avatar
                image={article.author?.image}
                name={article.author?.name}
              />
            </div>

            <div className="mx-2 font-semibold text-gray-700 dark:text-gray-200">
              {article.author?.name || "Unknown"}
            </div>
            <span className="flex-none mx-1 text-xs text-gray-600 dark:text-gray-300">
              {formatDaysAgo(article.createdAt)}
            </span>
            <div className="ml-auto flex-none">
              <Dropdown
                btn={
                  <DotsHorizontalIcon className="ml-auto circle-icon flex-none bg-100" />
                }
                menu={[
                  {
                    name: "Delete",
                  },
                  {
                    name: "Edit",
                  },
                  {
                    name: "Push",
                    onClick: () => {
                      console.log("dd click")
                    },
                  },
                ]}
              />
            </div>
            {/* <Dropdown
              btn={
                <DotsHorizontalIcon className="ml-auto circle-icon flex-none" />
              }
              menu={[
                {
                  name: "Delete",
                  onClick: () => {
                    console.log("dd click")
                  },
                },
                {
                  name: "Edit",
                  onClick: () => {
                    console.log("dd click")
                  },
                },
                {
                  name: "Push",
                  onClick: () => {
                    console.log("dd click")
                  },
                },
              ]}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
