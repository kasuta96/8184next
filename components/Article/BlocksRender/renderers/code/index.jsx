/** CodeOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 *
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
//#endregion

const CodeOutput = ({ data }) => {
  if (!data) return ""
  let content = null

  if (typeof data === "string") content = data
  else if (
    typeof data === "object" &&
    data.code &&
    typeof data.code === "string"
  )
    content = data.code
      .replace(/&/g, "&amp;")
      .replace(/>/g, "&gt;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;")

  if (!content) return ""
  return (
    <div className="bg-300 p-5 my-8 rounded text-sm border-l-4 border-pink-500 overflow-x-auto">
      <pre>
        <code className="">{ReactHtmlParser(content)}</code>
      </pre>
    </div>
  )
}

export default CodeOutput
