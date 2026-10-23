import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // bun installs into a single hoisted store at the repo root, and Turbopack
    // resolves workspace packages through it. Pin the root so the production
    // build can find `next` and the `@repo/*` symlinks above the app dir.
    turbopack: {
        root: "../../",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    transpilePackages: [
        "@repo/ui",
        "@repo/db",
        "@repo/auth",
        "@repo/hooks",
    ],
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default nextConfig;
