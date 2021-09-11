/** TableOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
//#endregion

const TableOutput = ({ data }) => {
  if (!data) return ""

  let content = data.content || []
  if (!Array.isArray(content) || content.length < 1) return ""

  const columnNames = content.shift()

  return (
    <table className="table mx-auto my-8 bg-200 shadow overflow-x-auto">
      <thead>
        <tr>
          {columnNames.map((columnName, index) => (
            <th
              key={index}
              className="border-b-2 py-4 px-8 border-gray-300 dark:border-gray-600 whitespace-nowrap font-semibold text-900"
            >
              {ReactHtmlParser(columnName)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((row, index) => (
          <tr key={index} className="text-700">
            {Array.isArray(row) &&
              row.length > 1 &&
              row.map((columnValue, i) => (
                <td
                  key={i}
                  className="border-b-2 py-4 px-8 border-gray-300 dark:border-gray-600"
                >
                  {ReactHtmlParser(columnValue)}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableOutput
