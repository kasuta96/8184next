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
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-8 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-50">
                <tr>
                  {columnNames.map((columnName, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-700 uppercase tracking-wider"
                    >
                      {ReactHtmlParser(columnName)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-200 divide-y divide-gray-400 text-600">
                {content.map((row, index) => (
                  <tr key={index}>
                    {Array.isArray(row) &&
                      row.length > 1 &&
                      row.map((columnValue, i) => (
                        <td key={i} className="px-6 py-4 whitespace-nowrap">
                          {ReactHtmlParser(columnValue)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableOutput
