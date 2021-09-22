import { DotsHorizontalIcon, FlagIcon } from "@heroicons/react/outline"
import React, { useState } from "react"
import Dropdown from "../../Dropdowns/Dropdown"

const ArticleOption = ({ id }) => {
  const menu = [
    {
      icon: <FlagIcon className="w-4 h-4" />,
      name: "Report",
      onClick: () => {
        console.log("Reporting " + id)
      },
    },
  ]

  return <Dropdown btn={<DotsHorizontalIcon className="ml-auto circle-icon flex-none bg-100" />} menu={menu} />
}

export default ArticleOption
