import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true  // GitHub Pagesでは画像最適化が使えないため
  },
  basePath: '/choice', // リポジトリ名を指定
  assetPrefix: '/choice', // basePath と同じ値を設定
};

export default nextConfig;
