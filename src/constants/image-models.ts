export interface ImageModelInfo {
  id: string;
  name: string;
  group: string;
}

export const IMAGE_MODEL_LIST: ImageModelInfo[] = [
  // Flux Models
  {
    id: "302ai-flux-v1.1-ultra-t2i",
    name: "Flux V1.1 Ultra",
    group: "Flux",
  },
  {
    id: "302ai-flux-v1.1-pro-t2i",
    name: "Flux V1.1 Pro",
    group: "Flux",
  },
  {
    id: "302ai-flux-kontext-pro-t2i",
    name: "Flux Kontext Pro",
    group: "Flux",
  },
  {
    id: "302ai-flux-kontext-max-t2i",
    name: "Flux Kontext Max",
    group: "Flux",
  },
  // Ideogram Models
  {
    id: "ideogram-v3-t2i",
    name: "Ideogram V3",
    group: "Ideogram",
  },
  {
    id: "ideogram-v3-quality-t2i",
    name: "Ideogram V3 Quality",
    group: "Ideogram",
  },
  {
    id: "ideogram-v3-turbo-t2i",
    name: "Ideogram V3 Turbo",
    group: "Ideogram",
  },

  // OpenAI Models
  {
    id: "dall-e-3-t2i",
    name: "DALL·E 3",
    group: "OpenAI",
  },
  {
    id: "gpt-image-1-t2i",
    name: "GPT-Image-1",
    group: "OpenAI",
  },

  // Recraft Models
  {
    id: "recraft-v3-t2i",
    name: "Recraft V3",
    group: "Recraft",
  },

  // ByteDance Models
  {
    id: "bagel-image-t2i",
    name: "Bagel Image",
    group: "ByteDance",
  },

  // Stability Models
  {
    id: "302ai-sdxl-t2i",
    name: "Stable Diffusion XL",
    group: "Stability",
  },
  {
    id: "302ai-sd35-medium-t2i",
    name: "Stable Diffusion 3.5 Medium",
    group: "Stability",
  },
  {
    id: "302ai-sd35-large-turbo-t2i",
    name: "Stable Diffusion 3.5 Large Turbo",
    group: "Stability",
  },
  {
    id: "302ai-sd35-large-t2i",
    name: "Stable Diffusion 3.5 Large",
    group: "Stability",
  },

  // Kling Models
  {
    id: "kling-v2-t2i",
    name: "Kling V2",
    group: "Kling",
  },
  {
    id: "kling-v2-1-t2i",
    name: "Kling V2.1",
    group: "Kling",
  },

  // Fal Models
  { id: "302ai-aura-flow-t2i", name: "Auraflow", group: "Fal" },

  // Midjourney Models
  {
    id: "midjourney-v7-t2i",
    name: "Midjourney V7.0",
    group: "Midjourney",
  },
  {
    id: "midjourney-v6-1-t2i",
    name: "Midjourney V6.1",
    group: "Midjourney",
  },
  {
    id: "midjourney-v6-t2i",
    name: "Midjourney V6.0",
    group: "Midjourney",
  },

  // Google Models
  {
    id: "google-v4-preview-t2i",
    name: "Google V4 Preview",
    group: "Google",
  },
  {
    id: "google-v3-t2i",
    name: "Google V3",
    group: "Google",
  },
  {
    id: "google-v3-fast-t2i",
    name: "Google V3 Fast",
    group: "Google",
  },

  // Doubao Models
  {
    id: "doubao-v3-t2i",
    name: "Doubao V3",
    group: "Doubao",
  },
  {
    id: "doubao-seedream-3-0-t2i-250415",
    name: "Doubao Seedream 3.0 T2I",
    group: "Doubao",
  },
  {
    id: "doubao-generations-t2i",
    name: "Doubao Generations",
    group: "Doubao",
  },
  {
    id: "doubao-v2.1-l-t2i",
    name: "Doubao V2.1 L",
    group: "Doubao",
  },
  {
    id: "doubao-v2-l-t2i",
    name: "Doubao V2 L",
    group: "Doubao",
  },
  {
    id: "doubao-v2-t2i",
    name: "Doubao V2",
    group: "Doubao",
  },

  // BAAI Models
  {
    id: "302ai-omnigen-v1-t2i",
    name: "Omnigen V1",
    group: "BAAI",
  },

  // Playground Models
  {
    id: "302ai-playground-v25-t2i",
    name: "Playground V25",
    group: "Playground",
  },

  // Minimax Models
  {
    id: "minimaxi-t2i",
    name: "Minimax Image",
    group: "Minimax",
  },

  // Zhipu Models
  {
    id: "cogview-4-t2i",
    name: "CogView 4",
    group: "Zhipu",
  },
  {
    id: "cogview-4-250304-t2i",
    name: "CogView 4 250304",
    group: "Zhipu",
  },

  // Lumina Models
  {
    id: "302ai-lumina-t2i",
    name: "Lumina Image V2",
    group: "Lumina",
  },

  // Baidu Models
  {
    id: "baidu-irag-t2i",
    name: "Baidu IRAG",
    group: "Baidu",
  },

  // HiDream Models
  {
    id: "hidream-i1-fast-t2i",
    name: "HiDream I1 Fast",
    group: "HiDream",
  },
  {
    id: "hidream-i1-dev-t2i",
    name: "HiDream I1 Dev",
    group: "HiDream",
  },
  {
    id: "hidream-i1-full-t2i",
    name: "HiDream I1 Full",
    group: "HiDream",
  },

  // Qwen Models
  {
    id: "qwen-t2i",
    name: "Qwen Image",
    group: "Qwen",
  },
];
