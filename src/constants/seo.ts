export type SEOData = {
  supportLanguages: string[];
  fallbackLanguage: string;
  languages: Record<
    string,
    { title: string; description: string; image: string }
  >;
};

export const SEO_DATA: SEOData = {
  // TODO: Change to your own support languages
  supportLanguages: ["zh", "en", "ja"],
  fallbackLanguage: "en",
  // TODO: Change to your own SEO data
  languages: {
    zh: {
      title: "视频生成器",
      description: "通过文字和图片生成视频",
      image: "/images/global/desc_zh.png",
    },
    en: {
      title: "Video Generator",
      description: "Generate videos from text and images",
      image: "/images/global/desc_en.png",
    },
    ja: {
      title: "ビデオジェネレーター",
      description: "テキストと画像からビデオを生成する",
      image: "/images/global/desc_ja.png",
    },
  },
};
