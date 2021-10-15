import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ArticleCard, { ArticleProps } from "../../components/Article/List/ArticleCard"
import Spin from "../../components/Icons/Spin"
import Layout from "../../components/Layout"
import useTrans from "../../hooks/useTrans"

export default function articles() {
  const { t, lang } = useTrans()

  const [articles, setArticles] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()
  const [more, setMore] = useState(false)

  const getArticles = async () => {
    // handle parameter
    let params = ""
    for (const [key, val] of Object.entries(query)) {
      let c = params == "" ? "?" : "&"
      params = params.concat(c, key, "=", val.toString())
    }

    // fetch request get articles with params
    const res = await fetch(`${process.env.HOST}/api/article/get-articles${params}`)
    const data = await res.json()
    if (!res.ok || !data) {
      setError("Can't get data")
      console.log("error", error)
      return null
    } else {
      // show/hide more btn
      data.article?.length < data.take ? setMore(false) : setMore(true)
      return data
    }
  }

  const parseArticles = async () => {
    setLoading(true)
    const data = await getArticles()
    if (data) {
      setArticles(data.article)
    }
    setLoading(false)
  }

  const moreArticles = async () => {
    setLoading(true)
    // get more data from last item's time
    query["time"] = articles.at(-1).createdAt

    const data = await getArticles()
    if (data) {
      // add to articles array
      setArticles([...articles, ...data.article])
    }
    setLoading(false)
  }

  // Call getArticles at first time & every route query change
  useEffect(() => {
    parseArticles()
  }, [query])

  return (
    <>
      <Head>
        <title>8184 - Articles</title>
      </Head>

      <Layout>
        <div className="space-y-2 sm:space-y-8 py-10 w-full max-w-4xl mx-auto">
          {articles?.length > 0
            ? articles.map((article: ArticleProps) => <ArticleCard key={article.id} article={article} />)
            : !loading && <p className="text-center font-bold text-xl text-600">{t("primary", "There is none")}</p>}

          <div className="text-center">
            {loading && <Spin className="my-8 mx-auto transition" />}

            {more ? (
              <button disabled={loading} onClick={moreArticles} className="btn-primary">
                {t("primary", "More")}
              </button>
            ) : (
              <p className="text-400 text-sm font-bold">_____End_____</p>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
