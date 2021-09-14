import { SearchIcon } from "@heroicons/react/outline"
import Router from "next/router"
import React, { useState } from "react"
import useTrans from "../../hooks/useTrans"

function SearchForm() {
  const { t, lang } = useTrans("layouts")
  const [kw, setKw] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    Router.push({
      pathname: "/a",
      query: {
        kw: kw,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center rounded-full bg-gray-100 dark:bg-gray-700 p-1">
        <input
          className="w-24 md:w-48 items-center ml-2 bg-transparent outline-none"
          type="text"
          name="kw"
          placeholder={t`Search`}
          value={kw}
          onChange={(e) => setKw(e.target.value)}
        />
        <button className="px-2" type="submit">
          <SearchIcon className="h-5 opacity-50" />
        </button>
      </div>
    </form>
  )
}
export default SearchForm
