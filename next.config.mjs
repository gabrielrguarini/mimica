import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Desabilitar o PWA em modo de desenvolvimento
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i, // Cache de imagens
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 24 * 60 * 60, // 1 dia
        },
      },
    },
  ],
});

export default nextConfig;
