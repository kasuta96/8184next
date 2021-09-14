import useTranslation from "next-translate/useTranslation"

export default function useTrans(dfns: string) {
  if (dfns) {
    const { t, lang } = useTranslation(dfns)
    return {
      t: (key: any, ...args: any) => {
        const currentText = `${dfns}:${key}`
        const currentTranslation = t(currentText, ...args)
        if (currentTranslation === currentText) return key
        return currentTranslation
      },
      lang,
    }
  }
  const { t, lang } = useTranslation()

  return {
    t: (ns: any, key: any, ...args: any) => {
      const currentText = `${ns}:${key}`
      const currentTranslation = t(currentText, ...args)
      if (currentTranslation === currentText) return key
      return currentTranslation
    },
    lang,
  }
}
