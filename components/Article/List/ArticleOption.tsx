import { DotsHorizontalIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import React, { useState } from "react"
import Dropdown from "../../Dropdowns/Dropdown"

const ArticleOption = ({ id }) => {
  const menu = [
    {
      name: "Publish",
      onClick: () => {
        console.log("Publishing " + id)
      },
    },
    {
      name: "Report",
      onClick: () => {
        console.log("Reporting " + id)
      },
    },
  ]

  return (
    <Dropdown
      btn={
        <DotsHorizontalIcon className="ml-auto circle-icon flex-none bg-100" />
      }
      menu={menu}
    />
  )
}

export default ArticleOption
