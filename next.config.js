const nextTranslate = require("next-translate")

const imageHost = [
  "links.papareact.com",
  "platform-lookaside.fbsbx.com",
  "scontent-nrt1-1.xx.fbcdn.net",
  "firebasestorage.googleapis.com",
  "lh3.googleusercontent.com",
  "avatars.githubusercontent.com",
  "images.unsplash.com",
  "i.picsum.photos",
  "picsum.photos",
]

module.exports = nextTranslate({
  async redirects() {
    return [
      {
        source: "/",
        destination: "/a",
        permanent: true,
      },
    ]
  },
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: imageHost,
  },
  env: {
    HOST: process.env.NEXTAUTH_URL,
    imageHost: imageHost,
    defaultLang: "en",
  },
  i18n: {
    // localeDetection: false,
    // These are all the locales you want to support in
    // your application
    locales: ["en", "vi", "ja"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      // {
      //   domain: 'example.com',
      //   defaultLocale: 'en',
      // },
      // {
      //   domain: 'example.fr',
      //   defaultLocale: 'fr',
      //   // an optional http field can also be used to test
      //   // locale domains locally with http instead of https
      //   http: true,
      // },
    ],
  },
})
