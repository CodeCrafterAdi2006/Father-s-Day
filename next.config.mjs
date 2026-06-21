/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static exports
  },
  basePath: "/Father-s-Day", // Required for GitHub Pages subfolder repository routing
};

export default nextConfig;
