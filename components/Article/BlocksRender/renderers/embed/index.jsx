/** EmbedOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
//#endregion

const EmbedOutput = ({ data }) => {
  if (!data || !data.embed) return ""

  let width = data.width ? data.width : 580
  let height = data.height ? data.height : 320
  let classNames = "mx-auto shadow-xl rounded-xl"

  if (data.service == "youtube") {
    classNames += " max-w-full"
  } else if (data.service == "codepen") {
    classNames += " w-full h-96"
  }

  return (
    <figure className="my-10 text-center">
      <iframe
        className={classNames}
        width={width}
        height={height}
        src={data.embed}
        title={data.caption}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        allowFullScreen
      ></iframe>
      {data.caption && (
        <figcaption className="text-gray-500 text-sm mt-4">
          {ReactHtmlParser(data.caption)}
        </figcaption>
      )}
    </figure>
  )
}

export default EmbedOutput
