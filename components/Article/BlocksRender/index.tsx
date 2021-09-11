/** EditorJS-React Renderer
 *
 * A small library that provides functions to parse and render data saved by
 * EditorJS into react components
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 *
 */

//#region imports
import React from "react"
import HeaderOutput from "./renderers/header/index.jsx"
import ParagraphOutput from "./renderers/paragraph/index.jsx"
import ImageOutput from "./renderers/image/index.jsx"
import EmbedOutput from "./renderers/embed/index.jsx"
import ListOutput from "./renderers/list/index.jsx"
import QuoteOutput from "./renderers/quote/index.jsx"
import ChecklistOutput from "./renderers/checklist/index.jsx"
import TableOutput from "./renderers/table/index.jsx"
import DelimiterOutput from "./renderers/delimiter/index.jsx"
import CodeOutput from "./renderers/code/index.jsx"
import TransOutput from "./renderers/trans/index.jsx"
//#endregion

const Output = ({ data }) => {
  if (!data || typeof data !== "object") return ""

  return data.blocks.map((block: { type: string; data: any }, i: React.Key) => {
    let Renderer = null

    switch (block.type.toLowerCase()) {
      case "code":
        Renderer = CodeOutput
        return <Renderer key={i} data={block.data} />
      case "header":
        Renderer = HeaderOutput
        return <Renderer key={i} data={block.data} />
      case "paragraph":
        Renderer = ParagraphOutput
        return <Renderer key={i} data={block.data} />
      case "image":
      case "simpleimage":
        Renderer = ImageOutput
        return <Renderer key={i} data={block.data} />
      case "embed":
        Renderer = EmbedOutput
        return <Renderer key={i} data={block.data} />
      case "table":
        Renderer = TableOutput
        return <Renderer key={i} data={block.data} />
      case "list":
        Renderer = ListOutput
        return <Renderer key={i} data={block.data} />
      case "checklist":
        Renderer = ChecklistOutput
        return <Renderer key={i} data={block.data} />
      case "quote":
        Renderer = QuoteOutput
        return <Renderer key={i} data={block.data} />
      case "delimiter":
        Renderer = DelimiterOutput
        return <Renderer key={i} />
      case "trans":
        Renderer = TransOutput
        return <Renderer key={i} count={i} data={block.data} />
      default:
        return ""
    }
  })
}

export {
  HeaderOutput,
  ParagraphOutput,
  ImageOutput,
  EmbedOutput,
  TableOutput,
  CodeOutput,
  ListOutput,
  QuoteOutput,
  DelimiterOutput,
  TransOutput,
  Output as default,
}
