import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ArticleCard, { ArticleProps } from "../../components/Article/List/ArticleCard"
import Spin from "../../components/Icons/Spin"
import Layout from "../../components/Layout"

export default function articles() {
  const [articles, setArticles] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  const getArticles = async (query: any) => {
    setLoading(true)
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
    } else {
      setArticles(data)
    }
    setLoading(false)
  }

  // Call getArticles at first time & every route query change
  useEffect(() => {
    getArticles(query)
  }, [query])

  return (
    <>
      <Head>
        <title>8184 - Articles</title>
      </Head>

      <Layout>
        <div className="space-y-8 py-10 w-full max-w-4xl mx-auto">
          {articles && articles.map((article: ArticleProps) => <ArticleCard key={article.id} article={article} />)}
          {loading && <Spin className="my-8 mx-auto transition" />}
        </div>
      </Layout>
    </>
  )
}
