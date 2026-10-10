import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "thebizz360",
    short_name: "thebizz360",
    description: "Food, services and business discovery for commercial complexes.",
    start_url: "/",
    display: "browser",
    background_color: "#fbf5ec",
    theme_color: "#fbf5ec",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
