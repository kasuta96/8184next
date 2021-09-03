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
  },
};
