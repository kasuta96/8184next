import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Layout from "../../components/Layout"
import ArticlePage, { ArticleProps } from "../../components/Article/Article"
import { useRouter } from "next/router"
import ErrorPage from "next/error"

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(encodeURI(`https://8184.vercel.app/api/article/slug/${params?.slug}`))
  const article = await res.json()

  return {
    props: article,
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const res = await fetch("https://8184.vercel.app/api/article/slug")
  const articles: ArticleProps[] = await res.json()

  const paths = []

  articles.map((a) =>
    locales.map((l) => {
      paths.push({
        params: {
          slug: a.slug + "-" + a.id,
        },
        locale: l,
      })
    })
  )

  return {
    paths: paths,
    fallback: true,
  }
}

const Article: React.FC<ArticleProps> = (props) => {
  const router = useRouter()
  if (!router.isFallback && !props?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        {router.isFallback ? <p>loading...</p> : <ArticlePage article={props} />}
      </div>
    </Layout>
  )
}

export default Article
