import ArticleCard, { ArticleProps } from "./ArticleCard"

const ArticleList = ({ articles }: { articles: ArticleProps[] }) => {
  console.log("render articles")

  return (
    <>
      {articles.map((article: ArticleProps) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </>
  )
}

export default ArticleList
