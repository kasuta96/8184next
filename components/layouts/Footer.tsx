import Link from "next/link"

export default function Footer() {
  return (
    <>
      <footer className="text-500 max-w-4xl mx-auto mt-10">
        <div className="py-4 px-5 flex flex-wrap flex-col sm:flex-row text-sm">
          <p className="text-center sm:text-left">
            © 2021 —
            <a href={"/"} rel="noopener noreferrer" className="text-500 ml-1 font-extrabold">
              {process.env.NEXT_PUBLIC_NAME}
            </a>
          </p>
          <div className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <nav className="text-center">
              <p className="mb-2">
                Contact:{" "}
                <a className="text-500" href="mailto:8184hotro@gmail.com?subject=[8184Support]">
                  8184hotro@gmail.com
                </a>
              </p>
              <Link href="/a/chinh-sach-quyen-rieng-tu-2">
                <a className="text-500">Privacy Policy</a>
              </Link>
              {" · "}
              <Link href="/a/dieu-khoan-dich-vu-3">
                <a className="text-500">Terms of Service</a>
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
