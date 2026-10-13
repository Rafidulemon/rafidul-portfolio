const mediaBase = (process.env.S3_PUBLIC_BASE_URL || "").trim().replace(/\/+$/, "");
const mediaHost = mediaBase ? new URL(mediaBase) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exposes the R2 public URL to client components (see app/lib/media.ts).
  env: { NEXT_PUBLIC_MEDIA_BASE: mediaBase },
  images: {
    remotePatterns: mediaHost
      ? [{ protocol: mediaHost.protocol.replace(":", ""), hostname: mediaHost.hostname, pathname: "/portfolio/**" }]
      : [],
  },
  async redirects() {
    return [
      // The old (non-functional) login page lived here.
      { source: "/auth/login", destination: "/admin/login", permanent: true },
    ];
  },
};

export default nextConfig;
