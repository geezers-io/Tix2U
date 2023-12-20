/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 node_modules/@supabase 타입에러 해결 불가로 옵션 추가
  },
};

module.exports = nextConfig;
