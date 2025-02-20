import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["flowbite.com", "lh3.googleusercontent.com", "fkrfxnwlarpexykfgjte.supabase.co"],
  },
  transpilePackages: ['three'],

};

export default nextConfig;
