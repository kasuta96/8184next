import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Layout from "../../components/Layout"
import ArticlePage, { ArticleProps } from "../../components/Article/Article"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Spin from "../../components/Icons/Spin"

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(encodeURI(`${process.env.BEFETCH}/api/article/slug/${params?.slug}`))
  const article = await res.json()

  return {
    props: article,
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const befetch = process.env.BEFETCH
  let articles: ArticleProps[] = []

  if (befetch) {
    try {
      const res = await fetch(`${befetch}/api/article/slug`)
      articles = await res.json()
    } catch (error) {
      console.log('No fetch data!');
    }
  }

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
        {router.isFallback ? <Spin className="mx-auto" /> : <ArticlePage article={props} />}
      </div>
    </Layout>
  )
}

export default Article
