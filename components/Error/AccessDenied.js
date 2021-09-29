import useTrans from "../../hooks/useTrans"
import SigninBtn from "../Buttons/SigninBtn"

export default function AccessDenied() {
  const { t } = useTrans()
  return (
    <section className="flex-grow min-h-screen p-5 mx-auto">
      <div className="lg:max-w-3xl mx-auto text-center space-y-4">
        <h3>{t("editor", "Access Denied")}</h3>
        <p>{t("editor", "You must be signed in to access this page")}</p>
        <SigninBtn />
      </div>
    </section>
  )
}
