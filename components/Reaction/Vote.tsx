import { signIn, useSession } from "next-auth/client"
import React, { useEffect, useState } from "react"
import Btn from "../Buttons/Btn"
import Avatar from "../Image/Avatar"
import { Rating } from "./Rating/Rating"
import StarIcon from "./Rating/StarIcon"
import SigninBtn from "../Buttons/SigninBtn"

function Vote({ id }: { id: number }) {
  const [rating, setRating] = useState(0)
  const [stars, setStars] = useState({
    average: 0,
    total: 0,
  })
  const [onRating, setOnRating] = useState({
    status: false,
    text: "",
  })
  const [session, loading] = useSession()

  // fetch all votes data
  const fetchVote = async (id: Number) => {
    const res = await fetch(`${process.env.HOST}/api/Reaction/Vote?id=${id}`)
    const data = await res.json()
    if (res.ok) {
      setStars({
        average: data.average,
        total: data.total,
      })
      if (data.voted) setRating(data.voted)
    } else {
      console.log("error", data)
    }
  }

  useEffect(() => {
    fetchVote(id)
  }, [])

  const handleRating = async (rate: number) => {
    if (rate == rating) return false
    setRating(rate)
    setOnRating({
      status: true,
      text: "Loading...",
    })
    const res = await fetch(`${process.env.HOST}/api/Reaction/Vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        level: rate,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      fetchVote(id)
    } else {
      console.log("rating error", data)
    }
    setOnRating({
      status: false,
      text: "Thank for your rating",
    })
  }

  return (
    <>
      <div className="flex items-center space-x-2 mb-8 mt-16">
        {loading && "loading..."}
        {session ? <Avatar image={session.user.image} size={35} /> : <SigninBtn />}
        <Rating
          onClick={session && !onRating.status ? handleRating : () => false}
          ratingValue={rating}
          size={30}
          className={(onRating.status ? "animate-pulse " : "") + "flex items-center"}
        />

        <span className="text-600 font-semibold flex items-center">
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
