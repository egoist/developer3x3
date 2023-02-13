import "server-only"

const dictsMap = {
  en: () => import("./en.json"),
  "zh-cn": () => import("./zh-cn.json"),
}

export type Dicts = typeof import("./en.json")

export const getDicts = (
  lang: string | undefined
): (() => Promise<{ default: Dicts }>) => {
  const dicts = dictsMap[lang || "en"] || dictsMap.en
  return dicts
}
