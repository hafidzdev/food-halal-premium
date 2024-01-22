/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  // modularizeImports: {
  //   "@mui/icons-material": {
  //     transform: "@mui/icons-material/{{member}}",
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
