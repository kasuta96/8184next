import React, { useEffect, useRef, useState } from "react"
import { ChevronUpIcon } from "@heroicons/react/solid"

interface AccordionProps {
  title: React.ReactNode
  content: React.ReactNode
  show?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  show = false,
}) => {
  const [active, setActive] = useState(show)
  const [height, setHeight] = useState("0px")
  const [rotate, setRotate] = useState("transform duration-300 ease")

  const contentSpace = useRef(null)
  useEffect(() => {
    // @ts-ignore
    setHeight(active ? `${contentSpace.current.scrollHeight}px` : "0px")
  }, [active])

  function toggleAccordion() {
    setActive(active === false ? true : false)
    setRotate(
      active
        ? "transform duration-300 ease"
        : "transform duration-300 ease rotate-180"
    )
  }

  return (
    <div className="flex flex-col border-l-4 border-indigo-700">
      <div
        className="appearance-none cursor-pointer focus:bg-white hover:bg-white dark:focus:bg-black dark:hover:bg-black flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <div className="inline-block">{title}</div>
        <ChevronUpIcon className={`${rotate} inline-block h-6 w-6`} />
      </div>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-300 ease-in-out"
      >
        {content}
      </div>
    </div>
  )
}
