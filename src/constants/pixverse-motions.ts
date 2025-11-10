export type MotionOption = Omit<MotionOptionData, "id">;

export type MotionOptionData = {
  id: string;
  label: string;
  value: string;
  payload: {
    image: string;
  };
};

export const VIDEO_HIGGSFIELD_MOTION_OPTION_MAP: Record<string, MotionOption> =
  {
    "4e981984-1cdc-4b96-a2b1-1a7c1ecb822d": {
      label: "higgsfield_motion.disintegration1",
      value: "4e981984-1cdc-4b96-a2b1-1a7c1ecb822d",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/634ede39-bc1f-4635-b4bc-eee2d87a4735.webp",
      },
    },
    "eacdca06-1fe2-4402-b8d6-4dc32f2889c5": {
      label: "higgsfield_motion.disintegration2",
      value: "eacdca06-1fe2-4402-b8d6-4dc32f2889c5",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/cd355c59-8f7c-494d-8409-617726f7582a.webp",
      },
    },
    "e0394620-9694-441b-b3f8-a4230abcd9ac": {
      label: "higgsfield_motion.car_explosion1",
      value: "e0394620-9694-441b-b3f8-a4230abcd9ac",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/289af8ae-661a-422b-85ed-c498cd3aa7cc.webp",
      },
    },
    "41574f0a-2e5d-4b8c-8b9d-b3fef81151a5": {
      label: "higgsfield_motion.car_explosion2",
      value: "41574f0a-2e5d-4b8c-8b9d-b3fef81151a5",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/5c68e49b-8ae4-4cfb-986f-efe1edccb956.webp",
      },
    },
    "97687e52-2cfc-4073-ae62-a00c057c2aa2": {
      label: "higgsfield_motion.lens_flare1",
      value: "97687e52-2cfc-4073-ae62-a00c057c2aa2",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/b8de1ca8-5fbc-4a99-b1df-d8d9cc4aeb54.webp",
      },
    },
    "53384cbd-e077-4668-b3fe-1ff771564f56": {
      label: "higgsfield_motion.lens_flare2",
      value: "53384cbd-e077-4668-b3fe-1ff771564f56",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/072ff546-5771-497e-afbd-372b409329c5.webp",
      },
    },
    "86b3d8dd-78e2-4c84-9ca3-5a5b3c5a6382": {
      label: "higgsfield_motion.dirty_lens1",
      value: "86b3d8dd-78e2-4c84-9ca3-5a5b3c5a6382",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/9a51bdce-eec3-4f7f-b3b3-8666ceabc1fc.webp",
      },
    },
    "635e322f-f711-4a4b-98b8-c1b62d7befe9": {
      label: "higgsfield_motion.dirty_lens2",
      value: "635e322f-f711-4a4b-98b8-c1b62d7befe9",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/c6bd7a67-f060-4be7-a951-3535641ebe6d.webp",
      },
    },
    "b8c1c065-2d00-4583-ac52-4e89ec2d2641": {
      label: "higgsfield_motion.soul_jump1",
      value: "b8c1c065-2d00-4583-ac52-4e89ec2d2641",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/5603662c-9c62-4a48-981d-bbd4f7b948fc.webp",
      },
    },
    "2650aad0-190e-4574-bde6-8378071a4d7c": {
      label: "higgsfield_motion.soul_jump2",
      value: "2650aad0-190e-4574-bde6-8378071a4d7c",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/2c7e7492-4198-4bd9-b6d6-f800efcd5dd0.webp",
      },
    },
    "fdc223d4-9402-47c6-9e07-5801985b450e": {
      label: "higgsfield_motion.set_on_fire1",
      value: "fdc223d4-9402-47c6-9e07-5801985b450e",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/61d282a0-e485-4408-8f24-eee02eef2dea.webp",
      },
    },
    "06b50d3a-65a9-432b-bf0b-493fc3dcc006": {
      label: "higgsfield_motion.set_on_fire2",
      value: "06b50d3a-65a9-432b-bf0b-493fc3dcc006",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/a0c9ff96-e3a7-4454-9099-a1f734f50c9e.webp",
      },
    },
    "3b83bad3-64bd-4baa-bf73-be886f19a10c": {
      label: "higgsfield_motion.flying1",
      value: "3b83bad3-64bd-4baa-bf73-be886f19a10c",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/8e79919f-3e66-4326-8695-5b96590123ee.webp",
      },
    },
    "d5ec4a6e-d982-4245-92eb-971c74505c9a": {
      label: "higgsfield_motion.flying2",
      value: "d5ec4a6e-d982-4245-92eb-971c74505c9a",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/ada09219-82bf-431c-99b5-ee2d3ffcc5a9.webp",
      },
    },
    "0ab33462-481e-4c78-8ffc-086bebd84187": {
      label: "higgsfield_motion.eyes_in1",
      value: "0ab33462-481e-4c78-8ffc-086bebd84187",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/688511d1-fcc8-4f75-872c-5696ca2b3b5a.webp",
      },
    },
    "f226ac67-43d3-4726-ad9c-132608bda8b3": {
      label: "higgsfield_motion.eyes_in2",
      value: "f226ac67-43d3-4726-ad9c-132608bda8b3",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/a8caa3db-bcf2-4e30-b5fe-37fafdd59140.webp",
      },
    },
    "aa555597-3d9b-4385-b9af-106fe7e995e2": {
      label: "higgsfield_motion.push_to_glass1",
      value: "aa555597-3d9b-4385-b9af-106fe7e995e2",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/c47e12c2-3afc-496d-84f5-0834d3f2bc92.webp",
      },
    },
    "d79c48c4-38ba-45d2-ae1c-70cd5924ccc3": {
      label: "higgsfield_motion.push_to_glass2",
      value: "d79c48c4-38ba-45d2-ae1c-70cd5924ccc3",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/e803055c-62bb-4b5d-a785-fc98d405e8a7.webp",
      },
    },
    "cd5bfd11-5a1a-46e0-9294-b22b0b733b1e": {
      label: "higgsfield_motion.face_punch1",
      value: "cd5bfd11-5a1a-46e0-9294-b22b0b733b1e",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/4c75250f-a508-4d36-b092-25cc0837f127.webp",
      },
    },
    "91da0dd0-c8e1-4793-b77e-946e98bc7ebb": {
      label: "higgsfield_motion.face_punch2",
      value: "91da0dd0-c8e1-4793-b77e-946e98bc7ebb",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/198644c9-d8d8-474b-a5f3-7b33dbaf6939.webp",
      },
    },
    "ad85a3a8-919d-45a3-8fa6-0727fc7b7fe7": {
      label: "higgsfield_motion.kiss1",
      value: "ad85a3a8-919d-45a3-8fa6-0727fc7b7fe7",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/5bb5661c-2876-4a67-bc71-76fbecd8ccb0.webp",
      },
    },
    "38c80734-90b7-4fcb-8fc2-16a055d2b3ba": {
      label: "higgsfield_motion.kiss2",
      value: "38c80734-90b7-4fcb-8fc2-16a055d2b3ba",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/ca3ccb38-9ce3-4249-ba80-0231c70732ae.webp",
      },
    },
    "46e23a6b-1047-40f1-9cf5-33f5f55ddf2e": {
      label: "higgsfield_motion.turning_metal1",
      value: "46e23a6b-1047-40f1-9cf5-33f5f55ddf2e",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/d44a136d-8b78-49c8-bf3d-889e5f30c547.webp",
      },
    },
    "ad8bffe9-17a9-493d-944d-7fe47275c663": {
      label: "higgsfield_motion.turning_metal2",
      value: "ad8bffe9-17a9-493d-944d-7fe47275c663",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/0f3b16dd-9295-49e4-9e91-17d158bf52d1.webp",
      },
    },
    "b6eb17bb-d336-46db-99c6-34f01ae754f3": {
      label: "higgsfield_motion.agent_reveal1",
      value: "b6eb17bb-d336-46db-99c6-34f01ae754f3",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/4602e616-84b7-4348-a48d-aa255c974329.webp",
      },
    },
    "a5e7e831-c323-4f69-926f-74f31197809b": {
      label: "higgsfield_motion.agent_reveal2",
      value: "a5e7e831-c323-4f69-926f-74f31197809b",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/d17809b1-c9a2-49e7-b979-e1015f9b9f83.webp",
      },
    },
    "ae4a319d-a06f-4b30-8b67-55a35a22f24a": {
      label: "higgsfield_motion.glam1",
      value: "ae4a319d-a06f-4b30-8b67-55a35a22f24a",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/a1f2a76f-c661-4ddb-8d8b-3b5f06db09c3.webp",
      },
    },
    "5763f4ec-ea6b-449d-9509-4596962668a8": {
      label: "higgsfield_motion.glam2",
      value: "5763f4ec-ea6b-449d-9509-4596962668a8",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/73febe1b-6c58-4ed9-aeaf-9337a2fa58c0.webp",
      },
    },
    "a7984a1f-f2ed-41a8-8a4c-4a66606ac6bb": {
      label: "higgsfield_motion.lens_crack",
      value: "a7984a1f-f2ed-41a8-8a4c-4a66606ac6bb",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/1b196aab-9ebc-4ea4-8d36-685d05eaa1c3.webp",
      },
    },
    "52d0b18d-c098-4526-b576-b2838d34855e": {
      label: "higgsfield_motion.wind_to_face1",
      value: "52d0b18d-c098-4526-b576-b2838d34855e",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/aa866b5d-a8a5-4d42-bbcf-b682602205b0.webp",
      },
    },
    "080d9f40-110d-4e74-bc93-bc4e9a9032d5": {
      label: "higgsfield_motion.wind_to_face2",
      value: "080d9f40-110d-4e74-bc93-bc4e9a9032d5",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/1c7da47c-4eed-491e-80fb-be89826ce230.webp",
      },
    },
    "52aa7be6-854f-45cb-930c-b98d64eb593c": {
      label: "higgsfield_motion.levitation1",
      value: "52aa7be6-854f-45cb-930c-b98d64eb593c",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/1825dcff-da3d-442b-b1dc-4f1bfe9006b5.webp",
      },
    },
    "b03ec615-8f3b-4058-a1b6-508ecaa27cb3": {
      label: "higgsfield_motion.levitation2",
      value: "b03ec615-8f3b-4058-a1b6-508ecaa27cb3",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/0c3977bd-8797-48f2-a15b-ab0ee5e3436e.webp",
      },
    },
    "dfeb0656-5d12-474c-87cd-1c80e94abdf2": {
      label: "higgsfield_motion.mouth_in1",
      value: "dfeb0656-5d12-474c-87cd-1c80e94abdf2",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/54d03a6c-f612-4086-9ddf-c8668dcef1ca.webp",
      },
    },
    "7351a8ad-9754-4844-94f1-00baf293d588": {
      label: "higgsfield_motion.mouth_in2",
      value: "7351a8ad-9754-4844-94f1-00baf293d588",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/ab6dbb88-b7f9-4260-8dff-7c23ef4088d7.webp",
      },
    },
    "e974bca9-c9eb-4cc8-9318-5676cc110f17": {
      label: "higgsfield_motion.building_explosion1",
      value: "e974bca9-c9eb-4cc8-9318-5676cc110f17",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/5d4e4106-9149-4761-9973-00cb66253357.webp",
      },
    },
    "0d53b135-337d-4918-aaf4-2af7ecf4f045": {
      label: "higgsfield_motion.building_explosion2",
      value: "0d53b135-337d-4918-aaf4-2af7ecf4f045",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/fa046def-4349-42fa-90d5-2b5df108b598.webp",
      },
    },
    "52101885-ad45-4469-a885-ced767318452": {
      label: "higgsfield_motion.thunder_god1",
      value: "52101885-ad45-4469-a885-ced767318452",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/d51e65ac-5132-41dc-b70d-a4a574c35c77.webp",
      },
    },
    "ca0568ee-6a0f-4134-a4ee-97dfe44753ba": {
      label: "higgsfield_motion.thunder_god2",
      value: "ca0568ee-6a0f-4134-a4ee-97dfe44753ba",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/1abf9bb7-8dfd-42b1-80a8-9ebd48e10487.webp",
      },
    },
    "d8c13031-7117-4a3d-9a30-6a00d0d408b4": {
      label: "higgsfield_motion.melting1",
      value: "d8c13031-7117-4a3d-9a30-6a00d0d408b4",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/208e5e19-956c-48a2-afb7-8ca822c29a23.webp",
      },
    },
    "ed15397e-0a3d-49e3-add4-b9529698a8ad": {
      label: "higgsfield_motion.melting2",
      value: "ed15397e-0a3d-49e3-add4-b9529698a8ad",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/b54b7f22-f4cf-4c9e-928c-fa6a8e6a3a9c.webp",
      },
    },
    "28a4d3d3-613a-4796-9f40-f68c7646ded5": {
      label: "higgsfield_motion.invisible1",
      value: "28a4d3d3-613a-4796-9f40-f68c7646ded5",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/7e036ad6-e8f6-423e-b4a9-027b13c68e7c.webp",
      },
    },
    "30802f12-3db4-49b8-b0ab-6f0c737b252e": {
      label: "higgsfield_motion.invisible2",
      value: "30802f12-3db4-49b8-b0ab-6f0c737b252e",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/404c4be5-ea7d-46b2-9d56-3ab61e69972b.webp",
      },
    },
    "8fccea16-08b5-432c-8123-8456523e2d60": {
      label: "higgsfield_motion.tentacles1",
      value: "8fccea16-08b5-432c-8123-8456523e2d60",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/1539a8fe-26e4-4ef5-9b8f-dfd1862b6625.webp",
      },
    },
    "df6600e1-387d-44e8-a8cb-96762a6ee8de": {
      label: "higgsfield_motion.tentacles2",
      value: "df6600e1-387d-44e8-a8cb-96762a6ee8de",
      payload: {
        image:
          "https://d1xarpci4ikg0w.cloudfront.net/2cc32411-1505-4970-9cb3-948a9519184c.webp",
      },
    },
  };

export const VIDEO_HIGGSFIELD_MOTION_OPTIONS: string[] = Object.values(
  VIDEO_HIGGSFIELD_MOTION_OPTION_MAP
).map((option) => option.value);
