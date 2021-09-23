export default function Footer() {
  return (
    <>
      <footer className="text-500 max-w-4xl mx-auto mt-10">
        <div className="py-4 px-5 flex flex-wrap flex-col sm:flex-row text-sm">
          <p className="text-400 text-center sm:text-left">
            © 2021 —
            <a
              href={process.env.HOST}
              rel="noopener noreferrer"
              className="text-500 ml-1 font-extrabold"
              target="_blank"
            >
              {process.env.DMNAME}
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            Contact: 8184hotro@gmail.com
          </span>
        </div>
      </footer>
    </>
  )
}
