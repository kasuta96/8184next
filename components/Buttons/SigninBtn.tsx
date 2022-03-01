import React, { useState } from "react"
import NewWindow from "../../pages/auth/NewWindow"
import useTrans from "../../hooks/useTrans"

const SigninBtn = () => {
  const { t, lang } = useTrans()

  const [popup, setPopUp] = useState(false)

  return (
    <div>
      <button aria-label="Signin" className="btn-primary" onClick={() => setPopUp(true)}>
        {t("primary", "Sign in")}
      </button>

      {popup ? (
        <NewWindow url="/auth/SigninWindow" title={t("primary", "Sign in")} onUnload={() => setPopUp(false)} />
      ) : null}
    </div>
  )
}

export default SigninBtn
