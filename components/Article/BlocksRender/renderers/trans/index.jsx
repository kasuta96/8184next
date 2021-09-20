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

  let original = data.original || ""
  let translation = data.translation || ""
  let option = data.option || "paragraph"

  const Tag = ({ data, className = "" }) => {
    return option == "header" ? (
      <h4 className={`font-bold ${className}`}>{ReactHtmlParser(data)}</h4>
    ) : (
      <p className={`${className}`}>{ReactHtmlParser(data)}</p>
    )
  }

  // if something empty
  if (!translation && !original) return ""
  if (!translation || !original)
    return <Tag data={original ? original : translation} className="my-8" />

  const Tabs = ({ id = "", original, translation }) => {
    const [openTrans, setOpenTrans] = React.useState(false)
    return (
      <div
        title="Click to switch language"
        className={
          "my-6 p-3 hover:shadow hover:bg-gray-200 dark:hover:bg-gray-700 rounded block cursor-pointer"
        }
        onClick={() => {
          setOpenTrans((prevOpenTrans) => !prevOpenTrans)
        }}
        data-trans={id}
      >
        <div className="float-right text-indigo-500 dark:text-indigo-300 pl-2">
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
