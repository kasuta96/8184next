/** TransOutput
 *
 * @version 1.0.0
 * @created - 2021.08.01
 * @author - kasuta <kasuta96@gmail.com>
 */

//#region imports
import React from "react"
import ReactHtmlParser from "react-html-parser"
//#endregion

const TransOutput = ({ data, count }) => {
  if (!data || typeof data !== "object") return ""

  let original = null
  let translation = null
  let option = "paragraph"

  if (data.original && typeof data.original === "string")
    original = data.original
  if (data.translation && typeof data.translation === "string")
    translation = data.translation
  if (data.option && typeof data.option === "string") option = data.option

  const Tag = ({ data }) => {
    return option == "header" ? (
      <h4 className="font-bold">{ReactHtmlParser(data)}</h4>
    ) : (
      <p className="">{ReactHtmlParser(data)}</p>
    )
  }

  const Tabs = ({ id = "", original, translation }) => {
    const [openTrans, setOpenTrans] = React.useState(false)
    return (
      <div
        className={
          "my-6 px-5 py-3 shadow rounded block cursor-pointer " +
          (openTrans == true ? "text-100 bg-600" : "text-800 bg-200")
        }
        onClick={() => {
          setOpenTrans((prevOpenTrans) => !prevOpenTrans)
        }}
        data-trans={id}
      >
        <div className="float-right text-indigo-400 pl-2">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 469.333 469.333"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M253.227,300.267L253.227,300.267L199.04,246.72l0.64-0.64c37.12-41.387,63.573-88.96,79.147-139.307h62.507V64H192V21.333h-42.667V64H0v42.453h238.293c-14.4,41.173-36.907,80.213-67.627,114.347c-19.84-22.08-36.267-46.08-49.28-71.467H78.72c15.573,34.773,36.907,67.627,63.573,97.28l-108.48,107.2L64,384l106.667-106.667l66.347,66.347L253.227,300.267z"></path>
            <path d="M373.333,192h-42.667l-96,256h42.667l24-64h101.333l24,64h42.667L373.333,192z M317.333,341.333L352,248.853l34.667,92.48H317.333z"></path>
          </svg>
        </div>

        <div
          data-lang="orig"
          className={openTrans == false ? "block" : "hidden"}
        >
          <Tag data={original} />
        </div>
        <div
          data-lang="tran"
          className={openTrans == true ? "block" : "hidden"}
        >
          <Tag data={translation} />
        </div>
      </div>
    )
  }

  return (
    <>
      {original && translation ? (
        <Tabs id={count} original={original} translation={translation} />
      ) : (
        <div>
          {original && <Tag data={original} />}
          {translation && <Tag data={translation} />}
        </div>
      )}
    </>
  )
}

export default TransOutput
