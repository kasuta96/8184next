import { NextApiResponse, NextApiRequest } from "next"
import GetCate from "./lib/GetCate"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return GetCate(req, res)
    // case "POST":
    //   return PostCate(req, res)
    // case "DELETE":
    //   return DeleteCate(req, res)
    default:
      return res.status(400).json({ message: "Invalid method." })
  }
}
