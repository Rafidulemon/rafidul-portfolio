/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The old (non-functional) login page lived here.
      { source: "/auth/login", destination: "/admin/login", permanent: true },
    ];
  },
};

export default nextConfig;
