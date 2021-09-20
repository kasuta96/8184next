import nhkParser from "./nhkParser"

export default function Parser(link: string) {
  const url = new URL(link)

  // change http -> https
  url.protocol = "https"

  switch (url.hostname) {
    case "www3.nhk.or.jp":
      return nhkParser(url.href)

    default:
      return null
  }
}
