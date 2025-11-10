// import { VideoModelSchemaResponseType } from "@/services/video-model/video-model.schema";

// import { VIDEO_HIGGSFIELD_MOTION_OPTIONS } from "./pixverse-motions";

// export const mockModels: VideoModelSchemaResponseType = {
//   total: 15,
//   models: [
//     {
//       model_name: "luma-video",
//       display_name: "Luma Video",
//       provider: "Luma",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//       ],
//     },
//     {
//       model_name: "runway-gen3",
//       display_name: "Runway Gen3",
//       provider: "Runway",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: true,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "image_as_end_frame",
//           required: false,
//           description: "是否将图片作为尾帧",
//         },
//         {
//           name: "video",
//           required: false,
//           description: "视频生成的视频文件",
//         },
//       ],
//     },
//     {
//       model_name: "runway-gen3-turbo",
//       display_name: "Runway Gen3 Turbo",
//       provider: "Runway",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: true,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "video",
//           required: false,
//           description: "视频生成的视频文件",
//         },
//       ],
//     },
//     {
//       model_name: "runway-gen4",
//       display_name: "Runway Gen4",
//       provider: "Runway",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//       ],
//     },
//     {
//       model_name: "runway-gen4-turbo",
//       display_name: "Runway Gen4 Turbo",
//       provider: "Runway",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//       ],
//     },
//     {
//       model_name: "kling-15",
//       display_name: "Kling 15",
//       provider: "Kling",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-15-hq",
//       display_name: "Kling 15 HQ",
//       provider: "Kling",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-16",
//       display_name: "Kling 16",
//       provider: "Kling",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [4, 5, 6, 7, 8],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-16-hq",
//       display_name: "Kling 16 HQ",
//       provider: "Kling",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-16-multi",
//       display_name: "Kling 16 Multi",
//       provider: "Kling",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图（支持最多4张）",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-21",
//       display_name: "Kling 21",
//       provider: "Kling",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-21-hq",
//       display_name: "Kling 21 HQ",
//       provider: "Kling",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-21-master",
//       display_name: "Kling 21 Master",
//       provider: "Kling",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//       ],
//     },
//     {
//       model_name: "kling-25-turbo",
//       display_name: "Kling 25 Turbo",
//       provider: "Kling",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "negative_prompt",
//           required: false,
//           description: "视频生成要避免的元素描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "enable_audio",
//           required: false,
//           description: "是否生成音频",
//         },
//       ],
//     },
//     {
//       model_name: "google-veo3",
//       display_name: "Google VEO3",
//       provider: "Google",
//       capabilities: {
//         t2v: true,
//         i2v: false,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["1:1", "16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "enhance_prompt",
//           required: false,
//           description: "增强提示",
//         },
//         {
//           name: "generate_audio",
//           required: false,
//           description: "是否生成音频",
//         },
//       ],
//     },
//     {
//       model_name: "google-veo3-fast",
//       display_name: "Google VEO3 Fast",
//       provider: "Google",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//       ],
//     },
//     {
//       model_name: "google-veo3-pro",
//       display_name: "Google VEO3 Pro",
//       provider: "Google",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//       ],
//     },
//     {
//       model_name: "google-veo3.1",
//       display_name: "Google VEO3.1",
//       provider: "Google",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "enhance_prompt",
//           required: false,
//           description: "增强提示",
//         },
//       ],
//     },
//     {
//       model_name: "google-veo3.1-pro",
//       display_name: "Google VEO3.1 Pro",
//       provider: "Google",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "enhance_prompt",
//           required: false,
//           description: "增强提示",
//         },
//       ],
//     },
//     {
//       model_name: "sora-2",
//       display_name: "Sora2",
//       provider: "OpenAI",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [4, 8, 12],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//       ],
//     },
//     {
//       model_name: "sora-2-pro",
//       display_name: "Sora2 Pro",
//       provider: "OpenAI",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: false,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:7", "7:4"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [4, 8, 12],
//             },
//           },
//           required: false,
//           description: "视频时长（秒）",
//         },
//       ],
//     },
//     {
//       model_name: "doubao-seedance-1-0-lite-t2v-250428",
//       display_name: "Doubao Seedance 1.0 Lite T2V 250428",
//       provider: "Doubao",
//       capabilities: {
//         t2v: true,
//         i2v: false,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//       ],
//     },
//     {
//       model_name: "doubao-seedance-1-0-lite-i2v-250428",
//       display_name: "Doubao Seedance 1.0 Lite I2V 250428",
//       provider: "Doubao",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//       ],
//     },
//     {
//       model_name: "doubao-seedance-1-0-pro-250528",
//       display_name: "Doubao Seedance 1.0 Pro 250428",
//       provider: "Doubao",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//       ],
//     },
//     {
//       model_name: "doubao-seedance",
//       display_name: "Doubao Seedance",
//       provider: "Doubao",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//       ],
//     },
//     {
//       model_name: "pixverse-v3.5",
//       display_name: "Pixverse V3.5",
//       provider: "Pixverse",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:3", "3:4", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "quality",
//           range: {
//             type: "list",
//             list: {
//               options: ["360p", "540p", "720p", "1080p"],
//             },
//           },
//           required: false,
//           description: "视频质量",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 8],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "motion_mode",
//           range: {
//             type: "list",
//             list: {
//               options: ["normal", "fast"],
//             },
//           },
//           required: false,
//           description: "视频生成模式",
//         },
//         {
//           name: "lip_sync_tts_speaker_id",
//           range: {
//             type: "list",
//             list: {
//               options: [
//                 "Auto",
//                 "1",
//                 "2",
//                 "3",
//                 "4",
//                 "5",
//                 "6",
//                 "7",
//                 "8",
//                 "9",
//                 "10",
//                 "11",
//                 "12",
//                 "13",
//                 "14",
//               ],
//             },
//           },
//           required: false,
//           description: "口型音色",
//         },
//         {
//           name: "lip_sync_tts_content",
//           required: false,
//           description: "唇动同步的文本内容",
//         },
//         {
//           name: "sound_effect_switch",
//           required: false,
//           description: "开启音效",
//         },
//       ],
//     },
//     {
//       model_name: "pixverse-v3.5-fusion",
//       display_name: "Pixverse V3.5 Fusion",
//       provider: "Pixverse",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "image2",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "image3",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:3", "3:4", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "quality",
//           range: {
//             type: "list",
//             list: {
//               options: ["360p", "540p", "720p", "1080p"],
//             },
//           },
//           required: false,
//           description: "视频质量",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "motion_mode",
//           range: {
//             type: "list",
//             list: {
//               options: ["normal", "fast"],
//             },
//           },
//           required: false,
//           description: "视频生成模式",
//         },
//         {
//           name: "lip_sync_tts_speaker_id",
//           range: {
//             type: "list",
//             list: {
//               options: [
//                 "Auto",
//                 "1",
//                 "2",
//                 "3",
//                 "4",
//                 "5",
//                 "6",
//                 "7",
//                 "8",
//                 "9",
//                 "10",
//                 "11",
//                 "12",
//                 "13",
//                 "14",
//               ],
//             },
//           },
//           required: false,
//           description: "口型音色",
//         },
//         {
//           name: "lip_sync_tts_content",
//           required: false,
//           description: "唇动同步的文本内容",
//         },
//         {
//           name: "sound_effect_switch",
//           required: false,
//           description: "开启音效",
//         },
//       ],
//     },
//     {
//       model_name: "pixverse-v4",
//       display_name: "Pixverse V4",
//       provider: "Pixverse",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:3", "3:4", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "quality",
//           range: {
//             type: "list",
//             list: {
//               options: ["360p", "540p", "720p", "1080p"],
//             },
//           },
//           required: false,
//           description: "视频质量",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "motion_mode",
//           range: {
//             type: "list",
//             list: {
//               options: ["normal", "fast"],
//             },
//           },
//           required: false,
//           description: "视频生成模式",
//         },
//         {
//           name: "lip_sync_tts_speaker_id",
//           range: {
//             type: "list",
//             list: {
//               options: [
//                 "Auto",
//                 "1",
//                 "2",
//                 "3",
//                 "4",
//                 "5",
//                 "6",
//                 "7",
//                 "8",
//                 "9",
//                 "10",
//                 "11",
//                 "12",
//                 "13",
//                 "14",
//               ],
//             },
//           },
//           required: false,
//           description: "口型音色",
//         },
//         {
//           name: "lip_sync_tts_content",
//           required: false,
//           description: "唇动同步的文本内容",
//         },
//         {
//           name: "sound_effect_switch",
//           required: false,
//           description: "开启音效",
//         },
//       ],
//     },
//     {
//       model_name: "pixverse-v4-fusion",
//       display_name: "Pixverse V4 Fusion",
//       provider: "Pixverse",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "image2",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "image3",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:3", "3:4", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "quality",
//           range: {
//             type: "list",
//             list: {
//               options: ["360p", "540p", "720p", "1080p"],
//             },
//           },
//           required: false,
//           description: "视频质量",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "motion_mode",
//           range: {
//             type: "list",
//             list: {
//               options: ["normal", "fast"],
//             },
//           },
//           required: false,
//           description: "视频生成模式",
//         },
//         {
//           name: "lip_sync_tts_speaker_id",
//           range: {
//             type: "list",
//             list: {
//               options: [
//                 "Auto",
//                 "1",
//                 "2",
//                 "3",
//                 "4",
//                 "5",
//                 "6",
//                 "7",
//                 "8",
//                 "9",
//                 "10",
//                 "11",
//                 "12",
//                 "13",
//                 "14",
//               ],
//             },
//           },
//           required: false,
//           description: "口型音色",
//         },
//         {
//           name: "lip_sync_tts_content",
//           required: false,
//           description: "唇动同步的文本内容",
//         },
//         {
//           name: "sound_effect_switch",
//           required: false,
//           description: "开启音效",
//         },
//       ],
//     },
//     {
//       model_name: "pixverse-v4.5",
//       display_name: "Pixverse V4.5",
//       provider: "Pixverse",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:3", "3:4", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "quality",
//           range: {
//             type: "list",
//             list: {
//               options: ["360p", "540p", "720p", "1080p"],
//             },
//           },
//           required: false,
//           description: "视频质量",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "motion_mode",
//           range: {
//             type: "list",
//             list: {
//               options: ["normal", "fast"],
//             },
//           },
//           required: false,
//           description: "视频生成模式",
//         },
//         {
//           name: "lip_sync_tts_speaker_id",
//           range: {
//             type: "list",
//             list: {
//               options: [
//                 "Auto",
//                 "1",
//                 "2",
//                 "3",
//                 "4",
//                 "5",
//                 "6",
//                 "7",
//                 "8",
//                 "9",
//                 "10",
//                 "11",
//                 "12",
//                 "13",
//                 "14",
//               ],
//             },
//           },
//           required: false,
//           description: "口型音色",
//         },
//         {
//           name: "lip_sync_tts_content",
//           required: false,
//           description: "唇动同步的文本内容",
//         },
//         {
//           name: "sound_effect_switch",
//           required: false,
//           description: "开启音效",
//         },
//       ],
//     },
//     {
//       model_name: "pixverse-v4.5-fusion",
//       display_name: "Pixverse V4.5 Fusion",
//       provider: "Pixverse",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "image2",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "image3",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "4:3", "3:4", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "quality",
//           range: {
//             type: "list",
//             list: {
//               options: ["360p", "540p", "720p", "1080p"],
//             },
//           },
//           required: false,
//           description: "视频质量",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [5, 10],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "motion_mode",
//           range: {
//             type: "list",
//             list: {
//               options: ["normal", "fast"],
//             },
//           },
//           required: false,
//           description: "视频生成模式",
//         },
//         {
//           name: "lip_sync_tts_speaker_id",
//           range: {
//             type: "list",
//             list: {
//               options: [
//                 "Auto",
//                 "1",
//                 "2",
//                 "3",
//                 "4",
//                 "5",
//                 "6",
//                 "7",
//                 "8",
//                 "9",
//                 "10",
//                 "11",
//                 "12",
//                 "13",
//                 "14",
//               ],
//             },
//           },
//           required: false,
//           description: "口型音色",
//         },
//         {
//           name: "lip_sync_tts_content",
//           required: false,
//           description: "唇动同步的文本内容",
//         },
//         {
//           name: "sound_effect_switch",
//           required: false,
//           description: "开启音效",
//         },
//       ],
//     },
//     {
//       model_name: "higgsfield-turbo",
//       display_name: "Higgsfield Turbo",
//       provider: "Higgsfield",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "motions",
//           range: {
//             type: "list",
//             list: {
//               options: VIDEO_HIGGSFIELD_MOTION_OPTIONS,
//             },
//           },
//           required: true,
//           description: "视频模板",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [3, 5],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//       ],
//     },
//     {
//       model_name: "higgsfield-lite",
//       display_name: "Higgsfield Lite",
//       provider: "Higgsfield",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "motions",
//           range: {
//             type: "list",
//             list: {
//               options: VIDEO_HIGGSFIELD_MOTION_OPTIONS,
//             },
//           },
//           required: true,
//           description: "视频模板",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [3, 5],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//       ],
//     },
//     {
//       model_name: "higgsfield-standard",
//       display_name: "Higgsfield Standard",
//       provider: "Higgsfield",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "end_image",
//           required: false,
//           description: "图片生成视频的尾帧参考图",
//         },
//         {
//           name: "motions",
//           range: {
//             type: "list",
//             list: {
//               options: VIDEO_HIGGSFIELD_MOTION_OPTIONS,
//             },
//           },
//           required: true,
//           description: "视频模板",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [3, 5],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//       ],
//     },
//     {
//       model_name: "midjourney-generate",
//       display_name: "Midjourney Generate",
//       provider: "Midjourney",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "motion",
//           range: {
//             type: "list",
//             list: {
//               options: ["low", "high"],
//             },
//           },
//           required: false,
//           description: "视频模板",
//         },
//       ],
//     },
//     {
//       model_name: "vidu-q1",
//       display_name: "Vidu Q1",
//       provider: "Vidu",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "style",
//           range: {
//             type: "list",
//             list: {
//               options: ["general", "anime"],
//             },
//           },
//           required: false,
//           description: "视频风格",
//         },
//         {
//           name: "bgm",
//           required: false,
//           description: "背景音乐",
//         },
//       ],
//     },
//     {
//       model_name: "vidu-1.5",
//       display_name: "Vidu 1.5",
//       provider: "Vidu",
//       capabilities: {
//         t2v: true,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "style",
//           range: {
//             type: "list",
//             list: {
//               options: ["general", "anime"],
//             },
//           },
//           required: false,
//           description: "视频风格",
//         },
//         {
//           name: "bgm",
//           required: false,
//           description: "背景音乐",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [4, 8],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "resolution",
//           range: {
//             type: "list",
//             list: {
//               options: ["1080p", "720p", "360p"],
//             },
//           },
//           required: false,
//           description: "视频分辨率",
//         },
//       ],
//     },
//     {
//       model_name: "vidu-2.0",
//       display_name: "Vidu 2.0",
//       provider: "Vidu",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "bgm",
//           required: false,
//           description: "背景音乐",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [4, 8],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "resolution",
//           range: {
//             type: "list",
//             list: {
//               options: ["1080p", "720p", "360p"],
//             },
//           },
//           required: false,
//           description: "视频分辨率",
//         },
//       ],
//     },
//     {
//       model_name: "viduq2-pro",
//       display_name: "Vidu Q2 Pro",
//       provider: "Vidu",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "bgm",
//           required: false,
//           description: "背景音乐",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [1, 2, 3, 4, 5, 6, 7, 8],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "resolution",
//           range: {
//             type: "list",
//             list: {
//               options: ["1080p", "720p"],
//             },
//           },
//           required: false,
//           description: "视频分辨率",
//         },
//       ],
//     },
//     {
//       model_name: "viduq2-turbo",
//       display_name: "Vidu Q2 Turbo",
//       provider: "Vidu",
//       capabilities: {
//         t2v: false,
//         i2v: true,
//         v2v: false,
//       },
//       parameters: [
//         {
//           name: "prompt",
//           required: true,
//           description: "视频生成的文本描述",
//         },
//         {
//           name: "image1",
//           required: true,
//           description: "图片生成视频的首帧参考图",
//         },
//         {
//           name: "aspect_ratio",
//           range: {
//             type: "list",
//             list: {
//               options: ["16:9", "9:16", "1:1"],
//             },
//           },
//           required: false,
//           description: "视频宽高比",
//         },
//         {
//           name: "bgm",
//           required: false,
//           description: "背景音乐",
//         },
//         {
//           name: "duration",
//           range: {
//             type: "list",
//             list: {
//               options: [1, 2, 3, 4, 5, 6, 7, 8],
//             },
//           },
//           required: false,
//           description: "视频时长",
//         },
//         {
//           name: "resolution",
//           range: {
//             type: "list",
//             list: {
//               options: ["1080p", "720p"],
//             },
//           },
//           required: false,
//           description: "视频分辨率",
//         },
//       ],
//     },
//   ],
// };
