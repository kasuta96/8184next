/** HeaderOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import HtmlReactParser from "html-react-parser"
//#endregion

const HeaderOutput = ({ data }) => {
  if (!data) return ""
  let classNames = "font-bold mb-8"
  let content = null

  if (typeof data === "string") content = data
  else if (typeof data === "object" && data.text && typeof data.text === "string") content = data.text

  if (!content) return ""
  if (typeof data === "object" && data.level && typeof data.level === "number") {
    switch (data.level) {
      case 1:
        return <h1 className={`${classNames} border-l-8 border-blue-900 pl-4 mt-16`}>{HtmlReactParser(content)}</h1>
      case 3:
        return <h3 className={`${classNames} border-l-8 border-blue-500 pl-3 mt-14`}>{HtmlReactParser(content)}</h3>
      case 4:
        return <h4 className={`${classNames} border-l-4 border-blue-400 pl-2 mt-12`}>{HtmlReactParser(content)}</h4>
      case 5:
        return <h5 className={`${classNames} border-l-4 border-blue-300 pl-2 mt-10`}>{HtmlReactParser(content)}</h5>
      case 6:
        return <h6 className={`${classNames} border-l-2 border-blue-200 pl-2 mt-8`}>{HtmlReactParser(content)}</h6>
      default:
        return <h2 className={`${classNames} border-l-8 border-blue-700 pl-4 mt-16`}>{HtmlReactParser(content)}</h2>
    }
  }
}

export default HeaderOutput
