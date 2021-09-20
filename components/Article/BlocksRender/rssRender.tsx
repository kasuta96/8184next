/** EditorJS-React Renderer
 *
 * A small library that provides functions to parse and render data saved by
 * EditorJS into react components
 *
 * @version 1.0.0 Small version for Rss Content
 * @created - 2021.09.19
 * @author - kasuta <kasuta96@gmail.com>
 *
 */

//#region imports
import React from "react"
// import HeaderOutput from "./renderers/header/index.jsx"
// import ParagraphOutput from "./renderers/paragraph/index.jsx"
import ImageOutput from "./renderers/image/index.jsx"
import EmbedOutput from "./renderers/embed/index.jsx"
import TransOutput from "./renderers/trans/index.jsx"
//#endregion

const Output = ({ data }) => {
  if (!data || typeof data !== "object") return ""

  return data.blocks.map((block: { type: string; data: any }, i: React.Key) => {
    let Renderer = null

    switch (block.type.toLowerCase()) {
      // case "header":
      //   Renderer = HeaderOutput
      //   return <Renderer key={i} data={block.data} />
      // case "paragraph":
      //   Renderer = ParagraphOutput
      //   return <Renderer key={i} data={block.data} />
      case "image":
      case "simpleimage":
        Renderer = ImageOutput
        return <Renderer key={i} data={block.data} />
      case "embed":
        Renderer = EmbedOutput
        return <Renderer key={i} data={block.data} />
      case "trans":
        Renderer = TransOutput
        return <Renderer key={i} count={i} data={block.data} />
      default:
        return ""
    }
  })
}

export default Output
