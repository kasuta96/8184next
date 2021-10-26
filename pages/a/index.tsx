import React, { useEffect, useMemo, useState } from "react"
import ArticlesList from "../../components/Article/ArticlesList"
import Spin from "../../components/Icons/Spin"
import Layout from "../../components/Layout"
import { useInView } from "react-intersection-observer"
import loadItems from "../../hooks/loadArticles"
import { useRouter } from "next/router"
import useTrans from "../../hooks/useTrans"
import Head from "next/head"

function Articles() {
  const { t, lang } = useTrans()
  const { query } = useRouter()

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  })
  const shouldLoadMore = !loading && inView && hasNextPage

  // get more articles
  useEffect(() => {
    if (shouldLoadMore) {
      const timer = setTimeout(async () => {
        console.log("⭐ get more articles")

        setLoading(true)
        const lastItem = items?.at(-1)?.createdAt || ""
        try {
          const { data, hasNextPage: newHasNextPage } = await loadItems({ lastItem, query })
          setItems((current) => [...current, ...data])
          setHasNextPage(newHasNextPage)
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
      }, 100)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [items, query, shouldLoadMore])

  // get new articles
  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("🏹 get new articles")

      setLoading(true)
      try {
        const { data, hasNextPage: newHasNextPage } = await loadItems({ query })
        setItems(data)
        setHasNextPage(newHasNextPage)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  }, [query])

  const meta = {
    title: "8184 - Articles",
    description:
      "Website là nơi Thành viên chia sẻ, trao đổi thông tin, kiến thức về cuộc sống, công việc, học tập của cộng đồng người Việt ở Nhật, cũng như người có đam mê, quan tâm đến Nhật Bản, Tiếng Nhật",
    thumbnail: "",
    language: lang,
    canonical: `${process.env.HOST}/a`,
  }

  // useMemo also lets you skip an expensive re-render of a child
  const ArticlesMemo = useMemo(() => <ArticlesList articles={items} />, [items])

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.thumbnail} />
        <meta property="og:type" content="website" />

        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:image" content={meta.thumbnail} />
        <meta property="twitter:card" content="summary_large_image" />

        <meta name="content-language" content={meta.language} />
        <link rel="canonical" href={meta.canonical} />
      </Head>

      <Layout>
        <div className="py-10 w-full max-w-4xl mx-auto">
          <div id="articles" className="space-y-2 sm:space-y-6">
            {ArticlesMemo}

            {!loading && items.length < 1 && (
              <p className="text-center font-bold text-xl text-600">{t("primary", "There is none")}</p>
            )}

            {hasNextPage && (
              <div ref={ref}>
                <Spin className="mx-auto" />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Articles
