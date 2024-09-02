import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Desabilita o PWA no desenvolvimento
});

export default nextConfig;
