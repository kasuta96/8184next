import Parser from "./Parser"

export default async function GetContent(link: string) {
  if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(link)) return <>Wrong URL</>

  const dataObj = await Parser(link)

  // render data object
  return dataObj
}
