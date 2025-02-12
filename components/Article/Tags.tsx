import React from "react"
import Router from "next/router"

const Tags: React.FC<{ tags: String }> = ({ tags }) => {
  const TagsArr = tags.split(",")
  return (
    <div className="flex flex-wrap justify-starts items-center my-4">
      {TagsArr.map((tag, index) => {
        tag = tag.trim()
        if (!tag) return false
        return (
          <div
            key={index}
            onClick={() => Router.push(`/a?kw=${tag}`)}
            className="text-sm m-1 py-1.5 px-4 bg-blue-200 text-gray-600 hover:bg-blue-300 rounded-2xl cursor-pointer"
          >
            # {tag}
          </div>
        )
      })}
    </div>
  )
}

export default Tags
