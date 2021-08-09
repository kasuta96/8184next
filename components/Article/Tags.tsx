import React from "react"
import Router from "next/router"

const Tags: React.FC<{ tags: String }> = ({ tags }) => {
  const TagsArr = tags.split(',')
  return (
    <div className="flex flex-wrap justify-starts items-center my-8">
      {
        TagsArr.map((tag, index) => {
          tag = tag.trim();
          return (
            <div key={index}
              onClick={() => Router.push(`/a?kw=${tag}`)}
              className="text-sm mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl cursor-pointer"
            >
              #{tag}
            </div>
          )
        })
      }
    </div>
  );
};

export default Tags;
