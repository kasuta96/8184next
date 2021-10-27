import Head from "next/head"
import React, { useEffect } from "react"
import Thumbnail from "../Image/Thumbnail"
import Avatar from "../Image/Avatar"
import Tags from "./Tags"
import ArticleReact from "../../components/Reaction/Article"
import BlocksRender from "./BlocksRender"
import Comment from "../Comment"
import FormatDate from "../handleData/FormatDate"
import { useRouter } from "next/router"
import PhotoSwipeLightbox from "../../lib/PhotoSwipe/photoswipe-lightbox.esm"
import PhotoSwipe from "../../lib/PhotoSwipe/photoswipe.esm"

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
  status: number
  sticker: {
    copyright: any[]
  }
}

const ArticlePage: React.FC<{ article: ArticleProps }> = ({ article }) => {
  const { locale } = useRouter()
  let authorName = article.author ? article.author.name : "Unknown author"
  let title = article.title
  if (article.status == 1) {
    title = `${title} (Draft)`
  }
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      // may select multiple "galleries"
      gallery: ".gallery",
      // Elements within gallery (slides)
      children: ".pswps",
      // Include PhotoSwipe Core
      // and use absolute path (that starts with http(s)://)
      pswpModule: PhotoSwipe,
    })

    lightbox.init()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={article.description} />
        <meta name="content-language" content={locale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.thumbnail} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={article.description} />
        <meta property="twitter:image" content={article.thumbnail} />
        <link rel="canonical" href={`${process.env.HOST}/a/${article.slug}-${article.id}`} />
      </Head>
      <div className="px-3 my-8">
        {/* <div className="relative rounded-lg shadow-xl h-60 sm:h-64 md:h-72 xl:h-80 w-full">
          <Thumbnail image={article.thumbnail} />
        </div> */}

        <h1 className="font-bold pt-4">{title}</h1>

        <div className="flex items-center mt-4">
          <div
            // href={"/user/" + article.author.id}
            className="block relative"
            aria-label="Avatar"
          >
            <Avatar image={article.author.image} name={authorName} />
          </div>
          <div className="flex flex-col justify-between ml-4 text-sm">
            <p className="font-bold text-700">{authorName}</p>
            <p className="text-gray-400 dark:text-gray-300">
              <FormatDate value={article.createdAt} />
            </p>
          </div>
        </div>

        <section className="gallery mt-10 mb-20">
          <BlocksRender data={article.content} />
        </section>

        {article.tags && <Tags tags={article.tags} />}

        {article.sticker?.copyright?.map((s, i) => {
          return (
            <div key={s.id || i} className="text-700 my-8">
              {s.name}:{" "}
              {s.data.url ? (
                <a href={s.data.url} target="_blank" rel="noreferrer">
                  {s.data.author ? s.data.author : s.data.url}
                </a>
              ) : (
                <span>{s.data.author ? s.data.author : s.data.id}</span>
              )}
            </div>
          )
        })}

        <ArticleReact authorId={article.author.id} articleId={article.id} published={article.published} />

        <Comment id={article.id} />
      </div>
    </>
  )
}

export default ArticlePage
