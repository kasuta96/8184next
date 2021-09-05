import type { NextApiRequest, NextApiResponse } from "next"
import CreateVote from "./Votes/CreateVote"
import FetchVote from "./Votes/FetchVote"

// DELETE /api/article/:id
export default async function Vote(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return CreateVote(req, res)
    case "GET":
      return FetchVote(req, res)
    default:
      // throw new Error(
      //   `The HTTP ${req.method} method is not supported at this route.`
      // )
      return res.status(400).json({
        message: `The HTTP ${req.method} method is not supported at this route.`,
      })
  }
}
