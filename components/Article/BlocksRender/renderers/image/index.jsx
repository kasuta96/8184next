/* eslint-disable @next/next/no-img-element */
/** ImageOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import HtmlReactParser from "html-react-parser"

//#endregion

const ImageOutput = ({ data }) => {
  if (!data || (!data.url && !data.file?.url)) return ""

  let classNames = {
    ctn: "my-8 text-center",
    img: "rounded-xl shadow-xl mx-auto max-h-96",
  }
  let url = data.url || data.file?.url
  let w = data.file?.w
  let h = data.file?.h

  if (data.withBorder) classNames.img += " ring-4 ring-blue-200"
  if (data.withBackground) classNames.ctn += " p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
  if (data.stretched) classNames.img = "rounded-xl shadow-xl mx-auto max-h-full"

  return (
    <figure className={classNames.ctn}>
      <a
        href={url}
        className={`${(w > 0) & (h > 0) && "pswps"}`}
        data-pswp-src={url}
        data-pswp-width={w}
        data-pswp-height={h}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={url} alt={data.caption || ""} className={classNames.img} />
      </a>
      {data.caption && <figcaption className="text-gray-400 text-sm mt-4">{HtmlReactParser(data.caption)}</figcaption>}
    </figure>
  )
}

export default ImageOutput
