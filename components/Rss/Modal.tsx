import { useState } from "react"
import Spin from "../Icons/Spin"
import Render from "../Article/BlocksRender/rssRender"
import useTrans from "../../hooks/useTrans"
import FormatDate from "../handleData/FormatDate"
import { useRouter } from "next/router"
import { useSession, signIn } from "next-auth/react"
import SigninBtn from "../Buttons/SigninBtn"

export default function Modal() {
  const { t, lang } = useTrans()
  const { data: session } = useSession()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setShowModal(false)
    setDisabled(true)
  }

  const openModal = () => {
    setModalContent(null)
    setShowModal(true)
  }

  const submitModal = async () => {
    setLoading(true)
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
      setLoading(true)
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
              <div className="w-full lg:w-auto mx-auto max-w-3xl">
                {/*content*/}
                <div className="flex flex-col max-h-screen outline-none focus:outline-none">
                  {/*body*/}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="relative p-6 flex-auto overflow-y-scroll bg-50"
                  >
                    <div className="text-center mb-4 text-400 text-lg">{t("primary", "Preview")}</div>
                    <h5 className="font-semibold">{modalContent?.title || ""}</h5>
                    <span className="text-xs">
                      {modalContent?.createdAt ? <FormatDate value={modalContent?.createdAt} /> : ""}
                    </span>

                    {modalContent?.error ? (
                      modalContent?.error
                    ) : modalContent?.content ? (
                      <>
                        <Render data={modalContent.content} />
                        <div className="text-700 my-8">
                          {t("rss", "Source")}:{" "}
                          <a href={modalContent.source.url} target="_blank" rel="noreferrer">
                            {modalContent.source.url}
                          </a>
                        </div>
                      </>
                    ) : (
                      <Spin className="my-8 mx-auto" />
                    )}
                  </div>
                  {/*footer*/}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="flex items-center justify-center p-4 border-t rounded-b-lg space-x-2 bg-100"
                  >
                    {session ? (
                      <button className="btn-primary" onClick={submitModal} disabled={disabled || loading}>
                        {t("rss", "Translate this content")} {loading && <Spin />}
                      </button>
                    ) : (
                      <>
                        <span className="text-600">{t("rss", "Translate this content")}</span>
                        <SigninBtn />
                      </>
                    )}

                    <button className="btn" type="button" onClick={closeModal}>
                      {t("primary", "Close")}
                    </button>
                  </div>

                  <div className="h-12 flex-none"></div>
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
