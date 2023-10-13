/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { maxid: process.env.maxid, totalPokemon: process.env.totalPokemon },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
