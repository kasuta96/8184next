/** ParagraphOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
//#endregion

const ParagraphOutput = ({ data }) => {
  if (!data) return ""

  let content = null

  if (typeof data === "string") content = data
  else if (
    typeof data === "object" &&
    data.text &&
    typeof data.text === "string"
  )
    content = data.text

  return content ? <p className="my-8">{ReactHtmlParser(content)}</p> : ""
}

export default ParagraphOutput
