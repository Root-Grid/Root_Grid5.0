/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{protocol: "https", hostname:['images.unsplash.com', "rukminim2.flixcart.com"], port: ""}]
      },
}

module.exports = nextConfig
