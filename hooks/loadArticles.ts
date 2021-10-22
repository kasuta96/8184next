import axios from "axios"
import { ArticleProps } from "../components/Article/List/ArticleCard"

interface Response {
  hasNextPage: boolean
  data: ArticleProps[]
}

function loadItems({ lastItem = "", query }): Promise<Response> {
  return new Promise((resolve) => {
    axios({
      method: "GET",
      url: `${process.env.HOST}/api/article/get-articles`,
      params: { time: lastItem, ...query },
    })
      .then((res) => {
        let data: ArticleProps[] = res.data.article
        resolve({ hasNextPage: res.data.article.length === res.data.take, data: data })
      })
      .catch((e) => {
        console.error(e)
      })
  })
}

export default loadItems
