/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tlwnuglzvlslqeqbqxog.supabase.co",
                pathname: "/storage/v1/object/public/products/**"

            }
        ]
    }
};

export default nextConfig;
