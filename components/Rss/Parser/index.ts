import nhkParser from "./nhkParser"

export default function Parser(link: string) {
  const url = new URL(link)

  switch (url.hostname) {
    case "www3.nhk.or.jp":
      return nhkParser(link)

    default:
      return null
  }
}
