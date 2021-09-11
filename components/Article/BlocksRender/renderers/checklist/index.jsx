/** ChecklistOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
import { BadgeCheckIcon as CheckIcon } from "@heroicons/react/outline"
import { BadgeCheckIcon as CheckedIcon } from "@heroicons/react/solid"
//#endregion

const ChecklistOutput = ({ data }) => {
  if (
    !data ||
    !data.items ||
    !Array.isArray(data.items) ||
    data.items.length < 1
  )
    return ""

  let content = []

  if (typeof data === "object") {
    if (data.items && Array.isArray(data.items))
      content = data.items.map((item, index) => (
        <div key={index} className="flex items-center space-x-3 mb-3">
          {item.checked ? (
            <CheckedIcon className="text-blue-600 h-6 w-6" />
          ) : (
            <CheckIcon className="text-gray-400 h-6 w-6" />
          )}
          <label className="text-gray-700 dark:text-white font-normal">
            {ReactHtmlParser(item.text)}
          </label>
        </div>
      ))
  }

  if (content.length <= 0) return ""

  return <div className="mx-4 my-8">{content}</div>
}

export default ChecklistOutput
