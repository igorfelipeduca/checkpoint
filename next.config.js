/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
        ],
      },
      env: {
        TWITCH_CLIENT_ID: "8f250dliy2g5m92nng3ed1m3gj9jix",
        TWITCH_CLIENT_SECRET: "s4r8vsmsu1cf0s7kvo65smtjkht7bm"
      }
}

module.exports = nextConfig
