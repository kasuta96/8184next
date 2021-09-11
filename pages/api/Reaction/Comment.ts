import { NextApiResponse, NextApiRequest } from "next"
import fetchComment from "./Comments/FetchComment"
import createComments from "./Comments/CreateComment"
import deleteComments from "./Comments/DeleteComment"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return fetchComment(req, res)
    case "POST":
      return createComments(req, res)
    case "DELETE":
      return deleteComments(req, res)
    default:
      return res.status(400).json({ message: "Invalid method." })
  }
}
