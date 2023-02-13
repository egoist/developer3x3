import type { Metadata } from "next"
import { Grid } from "../components/Gird"
import { getDicts } from "../dicts"

export const metadata: Metadata = {
  title: "Developer 3x3",
  description: "Developer 3x3 table for projects you're passionable about",
  twitter: {
    title: "Developer 3x3",
    description: "Developer 3x3 table for projects you're passionable about",
    card: "summary_large_image",
    images: [
      "https://fastly.jsdelivr.net/gh/egoist-bot/images@main/uPic/azS6sQ.png",
    ],
  },
}

export default async function Page({ params }: { params: { lang?: string } }) {
  const lang = params.lang || "en"
  const loadDicts = getDicts(lang)
  const dicts = await loadDicts()
  return (
    <div className="max-w-4xl mx-auto pt-5 pb-20">
      <h1 className="text-5xl font-bold text-center mb-5">Developer 3x3</h1>
      <Grid dicts={dicts.default} lang={lang} />
    </div>
  )
}
