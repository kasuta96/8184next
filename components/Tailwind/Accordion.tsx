import React, { useRef, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/solid";

interface AccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-300 ease");

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setActive(active === false ? true : false);
    // @ts-ignore
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
    setRotate(
      active
        ? "transform duration-300 ease"
        : "transform duration-300 ease rotate-180"
    );
  }

  return (
    <div className="flex flex-col border-l-4 border-indigo-700">
      <div
        className="p-4 appearance-none cursor-pointer focus:bg-white hover:bg-white flex items-center justify-between"
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
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};
