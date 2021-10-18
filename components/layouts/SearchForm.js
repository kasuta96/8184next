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
    <form onSubmit={handleSubmit} className="flex items-center rounded-full bg-200 p-1.5">
      <input
        className="w-14 md:w-48 items-center ml-2 bg-transparent outline-none"
        type="text"
        name="kw"
        placeholder={t`Search`}
        value={kw}
        onChange={(e) => setKw(e.target.value)}
      />
      <button aria-label="Search" className="px-2" type="submit">
        <SearchIcon className="h-5 opacity-50" />
      </button>
    </form>
  )
}
export default SearchForm
