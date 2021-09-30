import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import ArticlePage, { ArticleProps } from "../../components/Article/Article"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(encodeURI(`${process.env.HOST}/api/article/slug/${params?.slug}`))
  const article = await res.json()

  if (res.ok) {
    return {
      props: article,
    }
  } else {
    return {
      notFound: true,
    }
  }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch("https://8184.vercel.app/api/article/get-articles")
//   const data = await res.json()
//   const articles: ArticleProps[] = data.article

//   return {
//     paths: articles.map((a) => {
//       return {
//         params: {
//           slug: a.slug + "-" + a.id,
//         },
//       }
//     }),
//     fallback: true,
//   }
// }

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
