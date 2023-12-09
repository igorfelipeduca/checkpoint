/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    TWITCH_CLIENT_ID: "8f250dliy2g5m92nng3ed1m3gj9jix",
    TWITCH_CLIENT_SECRET: "s4r8vsmsu1cf0s7kvo65smtjkht7bm",
    SUPABASE_URL: "https://yoolmzuipostgxkgksgw.supabase.co",
    SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlvb2xtenVpcG9zdGd4a2drc2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwOTc1NTEsImV4cCI6MjAxNzY3MzU1MX0.tcfTaDn89HRGf51_0UEwdRmIbK5fkMwBxI2uABDq3jM",
  },
};

module.exports = nextConfig;
