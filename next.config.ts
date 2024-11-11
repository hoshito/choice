import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 静的エクスポートを有効化
  images: {
    unoptimized: true  // GitHub Pagesでは画像最適化が使えないため
  },
  basePath: '/choice', // リポジトリ名を指定
};

export default nextConfig;
