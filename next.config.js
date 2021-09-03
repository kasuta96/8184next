const imageHost = [
  "links.papareact.com",
  "platform-lookaside.fbsbx.com",
  "firebasestorage.googleapis.com",
  "lh3.googleusercontent.com",
  "avatars.githubusercontent.com",
  "images.unsplash.com",
  "i.picsum.photos",
  "picsum.photos",
];

module.exports = {
  images: {
    domains: imageHost,
  },
  env: {
    HOST: "http://localhost:3000",
    imageHost: imageHost,
    defaultLang: "en",
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en-US", "vi-VN", "ja-JP"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      // {
      //   domain: 'example.com',
      //   defaultLocale: 'en-US',
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
};
