export const ArraySearch = (array: any[], keyword: string) => {
  const searchTerm = keyword.toLowerCase()
  return array.filter(
    (value: {
      title: string
      description: string
      link: string
      created: string
    }) => {
      return (
        value.title.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        value.description.toLowerCase().match(new RegExp(searchTerm, "g"))
      )
    }
  )
}
