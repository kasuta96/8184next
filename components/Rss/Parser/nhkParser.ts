import Parser from "node-html-parser"
import axios from "axios"

export default async function nhkParser(link: string) {
  let url = link.split("/")
  const id = url[6]?.replace(".html", "") || ""
  const host = "https://www3.nhk.or.jp"

  const result = {
    title: null,
    tags: null,
    description: null,
    source: {
      author: null,
      id: id,
      url: link,
    },
    thumbnail: null,
    createdAt: null,
    content: {
      blocks: [],
    },
  }

  const pushP = (text: string) => {
    result.content.blocks.push({
      id: id,
      type: "trans",
      data: { option: "paragraph", original: text, translation: "" },
    })
  }

  const pushH = (text: string) => {
    result.content.blocks.push({
      id: id,
      type: "trans",
      data: { option: "header", original: text, translation: "" },
    })
  }

  const pushImg = (url: string) => {
    result.content.blocks.push({
      id: id,
      type: "simpleImage",
      data: {
        url: host + url,
        caption: "source: NHK News",
        withBorder: false,
        withBackground: false,
        stretched: false,
      },
    })
  }

  try {
    const { data } = await axios(link)
    if (data) {
      // Parse data (string) to root (DOM)
      let root = Parser(data)

      // Head
      let head = root.querySelector("head")
      // main
      let main = root.querySelector("section.module--detail-content")

      // get meta
      // title
      result.title = head.querySelector(
        "meta[property='og:title']"
      )?.attributes.content
      // keywords
      result.tags = head.querySelector(
        "meta[name='keywords']"
      )?.attributes.content
      // description
      result.description = head.querySelector(
        "meta[name='description']"
      )?.attributes.content
      // author
      result.source.author = head.querySelector(
        "meta[name='author']"
      )?.attributes.content
      // image (thumbnail)
      result.thumbnail = head.querySelector(
        "meta[property='og:image']"
      )?.attributes.content
      // time
      result.createdAt = main.querySelector("time")?.attributes.datetime

      // header iframe (video)
      let iframe = main.querySelector("header")?.querySelector("iframe")
        ?.attributes?.src
      iframe &&
        result.content.blocks.push({
          id: id,
          type: "embed",
          data: {
            service: "nhk",
            source: host + iframe,
            embed: host + iframe,
            width: 640,
            height: 360,
            caption: "source: NHK News",
          },
        })

      // header image
      let image = main.querySelector("header")?.querySelector("img")
        ?.attributes["data-src"]
      image && pushImg(image)

      // summary
      let summary = main.querySelector("p.content--summary")?.rawText
      summary && pushP(summary)

      // content--detail-more
      let detail = main.querySelector("div.content--detail-more")
      // more summary
      let summaryMore = detail.querySelector(
        "p.content--summary-more"
      )?.innerHTML
      if (summaryMore) {
        let arr = summaryMore.split("<br><br>")
        arr.map((p) => {
          pushP(p)
        })
      }

      summaryMore && pushP(summaryMore)

      // content--body
      let body = main.querySelectorAll("section.content--body")
      if (body) {
        body.map((b) => {
          // body header
          let bh = b.querySelector("h2.body-title")?.rawText
          bh && pushH(bh)
          // body image
          let bimg = b.querySelector("img")?.attributes["data-src"]
          bimg && pushImg(bimg)
          // body text
          let bp = b.querySelector("div.body-text")?.innerHTML
          if (bp) {
            let arr = bp.split("<br><br>")
            arr.map((p) => {
              pushP(p)
            })
          }
        })
      }
      return result
    }
    // No data
    return null
  } catch (error) {
    console.log("err", error)
    return null
  }
}
