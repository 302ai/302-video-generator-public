declare module "is-english" {
  function isEnglish(text: string, options?: { threshold?: number }): boolean;
  export = isEnglish;
}
