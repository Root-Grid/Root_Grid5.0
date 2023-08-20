/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{protocol: "https", hostname:"rukminim2.flixcart.com", port: ""}]
      },
}

module.exports = nextConfig
