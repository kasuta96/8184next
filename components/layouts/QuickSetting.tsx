import React from "react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { GlobeIcon, MoonIcon, SunIcon } from "@heroicons/react/outline"
import Dropdown from "../Dropdowns/Dropdown"
import useTrans from "../../hooks/useTrans"

export default function QuickSetting({ className }: { className: string }) {
  const router = useRouter()
  const { t } = useTrans("layouts")

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const { locale } = router
  const changeLanguage = (e: string) => {
    const locale = e
    router.push(router.pathname, router.asPath, { locale })
  }

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={`space-x-2 ${className}`}>
      <button
        aria-label="Theme color"
        className="p-1.5 rounded-full hover:bg-200"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme == "dark" ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </button>

      {/* <select
        onChange={changeLanguage}
        defaultValue={locale}
        className="py-2 bg-50 hover:bg-200 rounded-md cursor-pointer focus:outline-none"
      >
        <option className="" value="en">
          EN
        </option>
        <option className="p-4" value="vi">
          VI
        </option>
        <option className="" value="ja">
          JA
        </option>
      </select> */}

      <Dropdown
        btn={<GlobeIcon className="circle-icon" />}
        header={<div className="px-4 py-2 text-600 font-medium text-center">{t`Language`}</div>}
        menu={[
          {
            name: "English",
            onClick: () => changeLanguage("en"),
          },
          {
            name: "Tiếng Việt",
            onClick: () => changeLanguage("vi"),
          },
          {
            name: "日本語",
            onClick: () => changeLanguage("ja"),
          },
        ]}
      />
    </div>
  )
}
