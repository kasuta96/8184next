import React from "react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

export default function QuickSetting({ className }: { className: string }) {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const { locale } = router
  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, { locale })
  }

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={`space-x-2 ${className}`}>
      <button
        className="p-1 rounded"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme == "dark" ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </button>

      <select
        onChange={changeLanguage}
        defaultValue={locale}
        className="py-1 bg-transparent rounded-md shadow cursor-pointer focus:outline-none"
      >
        <option className="text-black" value="en">
          EN
        </option>
        <option className="text-black" value="vi">
          VI
        </option>
        <option className="text-black" value="ja">
          JA
        </option>
      </select>
    </div>
  )
}
