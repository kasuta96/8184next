import { signIn, useSession } from "next-auth/client"
import React, { useEffect, useState } from "react"
import Btn from "../Buttons/Btn"
import Avatar from "../Image/Avatar"
import { Rating } from "./Rating/Rating"
import StarIcon from "./Rating/StarIcon"

function Vote({ id }: { id: number }) {
  const [rating, setRating] = useState(0)
  const [stars, setStars] = useState({
    average: 0,
    total: 0,
  })
  const [onRating, setOnRating] = useState({
    status: false,
    text: "Let's Rate for this Article",
  })
  const [session, loading] = useSession()

  const fetchVote = async (id: Number) => {
    const res = await fetch(process.env.HOST + `/api/Reaction/Vote?id=${id}`)
    const data = await res.json()
    if (res.ok) {
      setStars({
        average: data.average,
        total: data.total,
      })
      if (data.voted > 0) setRating(data.voted)
    } else {
      console.log("error", data)
    }
  }

  useEffect(() => {
    fetchVote(id)
  }, [rating])

  const handleRating = async (rate: number) => {
    if (rate == rating) return false
    setOnRating({
      status: true,
      text: "Loading...",
    })
    const res = await fetch(process.env.HOST + `/api/Reaction/Vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        level: rate,
      }),
    })
    const data = await res.json()
    const errorCode = res.ok ? false : res.status
    if (errorCode) {
      console.log(errorCode)
    } else {
      console.log("Rating ok", data)
      setRating(rate)
    }
    setOnRating({
      status: false,
      text: "Thank for your rating",
    })
  }

  return (
    <>
      <div className="flex items-center space-x-2 my-4">
        {loading && "loading..."}
        {session ? (
          <Avatar image={session.user.image} size={35} />
        ) : (
          <Btn onClick={() => signIn()} title="Sign in" />
        )}
        <Rating
          onClick={session && !onRating.status ? handleRating : () => false}
          ratingValue={rating}
          size={30}
          className="flex items-center"
        />

        <span className="text-gray-500 font-semibold flex items-center">
          {stars.average}
          <StarIcon size={17} />
          {" (" + stars.total + ")"}
        </span>
        <p className="text-gray-700">{onRating.text}</p>
      </div>
    </>
  )
}

export default Vote
