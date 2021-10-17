/** ListOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import HtmlReactParser from "html-react-parser"
//#endregion

const validListStyles = ["ordered", "unordered"]

const ListOutput = ({ data }) => {
  if (!data) return ""
  let content = [],
    listType = "ordered"

  if (typeof data === "string") content.push(data)
  else if (typeof data === "object") {
    if (data.style && validListStyles.includes(data.style)) listType = data.style

    if (data.items && Array.isArray(data.items))
      content = data.items.map((item, index) => (
        <li key={index} className="relative pb-5">
          <div className="h-full w-4 absolute inset-0 flex justify-center -ml-6">
            <div className="h-full w-1 bg-300 pointer-events-none"></div>
          </div>
          {listType == "ordered" ? (
            <div className="px-1.5 inline-flex items-center justify-center bg-100 text-indigo-500 relative text-xl font-bold -ml-7">
              {index + 1}
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative text-sm -ml-6"></div>
          )}
          <p className="ml-3 -mt-6">{HtmlReactParser(item)}</p>
        </li>
      ))
  }

  if (content.length <= 0) return ""

  return <ul className="my-8 mr-4 ml-4 md:ml-8">{content}</ul>
}

export default ListOutput
