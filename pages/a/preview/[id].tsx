import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../../components/Layout"
import ArticlePage, { ArticleProps } from "../../../components/Article/Article"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`${process.env.HOST}/api/article/${params?.id}`)
  const article = await res.json()

  if (article?.status) {
    return {
      props: article.body,
    }
  } else {
    return {
      notFound: true,
    }
  }
}

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        <ArticlePage article={props} />
      </div>
    </Layout>
  )
}

export default Article
