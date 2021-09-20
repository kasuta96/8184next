import { useState } from "react"
import Spin from "../Icons/Spin"
import Render from "../Article/BlocksRender/rssRender"
import useTrans from "../../hooks/useTrans"
import FormatDate from "../handleData/FormatDate"
import { useRouter } from "next/router"

export default function Modal() {
  const { t, lang } = useTrans()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [disabled, setDisabled] = useState(true)

  const closeModal = () => {
    setShowModal(false)
    setDisabled(true)
  }

  const openModal = () => {
    setModalContent(null)
    setShowModal(true)
  }

  const submitModal = async () => {
    setDisabled(true)
    // Save data & route -> create page
    try {
      const res = await fetch(`${process.env.HOST}/api/article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: true, ...modalContent }),
      })
      const result = await res.json()
      if (result.route) {
        router.push(result.route)
      }
    } catch (error) {
      console.log(error)
      setDisabled(false)
    }
  }

  function ModalCtn() {
    return (
      <>
        {showModal ? (
          <>
            <div
              onClick={closeModal}
              className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-40 outline-none focus:outline-none"
            >
              <div className="relative w-auto mx-auto max-w-3xl">
                {/*content*/}
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-screen bg-50 outline-none focus:outline-none"
                >
                  {/*header*/}
                  <div className="p-4 pb-2 border-b border-solid">
                    <button
                      className="float-right p-1 bg-transparent border-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={closeModal}
                    >
                      ×
                    </button>
                    <h5 className="font-semibold">
                      {modalContent?.title || ""}
                    </h5>
                    <span className="text-xs">
                      {modalContent?.createdAt ? (
                        <FormatDate value={modalContent?.createdAt} />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto overflow-y-scroll">
                    {modalContent?.error ? (
                      modalContent?.error
                    ) : modalContent?.content ? (
                      <Render data={modalContent.content} />
                    ) : (
                      <Spin className="my-8 mx-auto" />
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-4 border-t border-solid space-x-2">
                    <button className="btn" type="button" onClick={closeModal}>
                      {t("primary", "Close")}
                    </button>
                    <button
                      className="btn-primary"
                      type="button"
                      onClick={submitModal}
                      disabled={disabled}
                    >
                      {t("rss", "Translate this content")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-30 bg-black"></div>
          </>
        ) : null}
      </>
    )
  }

  return {
    openModal,
    setModalContent,
    ModalCtn,
    setDisabled,
  }
}
