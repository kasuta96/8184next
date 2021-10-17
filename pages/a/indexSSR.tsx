import React from "react"
import Layout from "../../components/Layout"
import ArticleCard, { ArticleProps } from "../../components/Article/List/ArticleCard"
import Head from "next/head"
import ArticleList from "../../components/Article/List/Index"
// import { NextApiRequest, NextApiResponse } from 'next'
const { URL, URLSearchParams } = require("url")

export async function getServerSideProps(context: { query: any }) {
  const fetchUrl = new URL(`${process.env.HOST}/api/article/get-articles`)
  fetchUrl.search = new URLSearchParams(context.query).toString()

  const res = await fetch(fetchUrl)
  const data = await res.json()

  if (!data || !res.ok) {
    return {
      notFound: true,
    }
  }

  const articles = data.article

  return {
    props: { articles },
  }
}

type Props = {
  articles: ArticleProps[]
}

const Articles: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>8184 - Articles</title>
      </Head>

      <Layout>
        <div className="space-y-8 py-10 w-full max-w-4xl mx-auto">
          <ArticleList articles={props.articles} />
        </div>
      </Layout>
    </>
  )
}

export default Articles
