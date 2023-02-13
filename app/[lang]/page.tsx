import { langNames } from "../../dicts"

export { default, metadata } from "../page"

export async function generateStaticParams() {
  return langNames.map((name) => ({ lang: name }))
}
