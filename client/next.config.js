/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fukinfriends.s3.ap-northeast-2.amazonaws.com",
            },
        ],
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
