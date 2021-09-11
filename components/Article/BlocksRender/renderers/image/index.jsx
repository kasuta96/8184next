/** ImageOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
//#endregion

const ImageOutput = ({ data }) => {
  if (!data || (!data.url && !data.file?.url)) return ""

  let classNames = {
    ctn: "my-8 text-center",
    img: "rounded-xl shadow-xl mx-auto max-h-96",
  }
  let url = data.url || data.file?.url

  if (data.withBorder) classNames.img += " ring-4 ring-blue-200"
  if (data.withBackground)
    classNames.ctn += " p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
  if (data.stretched) classNames.img += " max-h-full"

  return (
    <figure className={classNames.ctn}>
      <img src={url} alt={data.caption || ""} className={classNames.img} />
      {data.caption && (
        <figcaption className="text-gray-400 text-sm mt-4">
          {ReactHtmlParser(data.caption)}
        </figcaption>
      )}
    </figure>
  )
}

export default ImageOutput
