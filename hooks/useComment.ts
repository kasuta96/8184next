import { useState } from "react"
import useSWR from "swr"

const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    // Attach extra info to the error object.
    error.message = await res.json()
    throw error
  }

  return res.json()
}

export default function useComments({ id }) {
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const {
    data: comments,
    error,
    mutate,
  } = useSWR(`${process.env.HOST}/api/Reaction/Comment?article=${id}`, fetcher)

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSending(true)

    try {
      const res = await fetch(
        `${process.env.HOST}/api/Reaction/Comment?article=${id}`,
        {
          method: "POST",
          body: JSON.stringify({ id, text }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const json = await res.json()
      if (res.ok) {
        setText("")
        mutate()
      } else {
        console.log("submit error", json.message)
      }
    } catch (err) {
      console.log(err)
    }
    setSending(false)
  }

  const onDelete = async (comment: any) => {
    setDeleting(true)
    try {
      const res = await fetch(
        `${process.env.HOST}/api/Reaction/Comment?article=${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({ id, comment }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      res.ok ? mutate() : console.log("delete error", res.json())
    } catch (err) {
      console.log(err)
    }
    setDeleting(false)
  }

  return {
    text,
    setText,
    comments,
    error,
    onSubmit,
    onDelete,
    sending,
    deleting,
  }
}
