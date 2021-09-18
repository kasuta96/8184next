import Head from "next/head"
import React from "react"
import Thumbnail from "../Image/Thumbnail"
import Avatar from "../Image/Avatar"
import Tags from "./Tags"
import ArticleReact from "../../components/Reaction/Article"
import BlocksRender from "./BlocksRender"
import Comment from "../Comment"
import FormatDate from "../handleData/FormatDate"

export type ArticleProps = {
  id: number
  title: string
  author: {
    name: string
    image: string
    id: string
  } | null
  content: object
  slug: string
  description: string
  thumbnail: string
  tags: string
  published: boolean
  createdAt: Date
  status: string
  stickers: {
    copyright: number
  }
}

const ArticlePage: React.FC<{ article: ArticleProps }> = ({ article }) => {
  let authorName = article.author ? article.author.name : "Unknown author"
  let title = article.title
  if (!article.published) {
    title = `${title} (Draft)`
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={article.description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.thumbnail} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={article.description} />
        <meta property="twitter:image" content={article.thumbnail} />
      </Head>
      <div className="px-3 mb-8">
        <div className="rounded-lg shadow-xl h-60 sm:h-64 md:h-72 xl:h-80 w-full">
          <Thumbnail image={article.thumbnail} />
        </div>

        <h3 className="font-bold pt-4">{title}</h3>

        <div className="flex items-center mt-4">
          <a href={"/user/" + article.author.id} className="block relative">
            <Avatar image={article.author.image} name={authorName} />
          </a>
          <div className="flex flex-col justify-between ml-4 text-sm">
            <p className="font-bold text-gray-800 dark:text-white">
              {authorName}
            </p>
            <p className="text-gray-400 dark:text-gray-300">
              <FormatDate value={article.createdAt} />
            </p>
          </div>
        </div>

        <section className="mt-10 mb-20">
          <BlocksRender data={article.content} />
        </section>

        {article.tags && <Tags tags={article.tags} />}

        {article.stickers?.copyright && (
          <p>copyright: {article.stickers?.copyright}</p>
        )}

        <ArticleReact
          authorId={article.author.id}
          articleId={article.id}
          published={article.published}
        />

        <Comment id={article.id} />
      </div>
    </>
  )
}

export default ArticlePage
