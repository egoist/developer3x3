import { PageConfig } from "next"
import { NextRequest } from "next/server"

export const config: PageConfig = {
  runtime: "edge",
}

export default async (req: NextRequest) => {
  const icon = req.nextUrl.searchParams.get("icon")
  const url = /^https?:\/\//.test(icon)
    ? icon
    : `https://www.wappalyzer.com/images/icons/${icon}`
  return fetch(url).then((res) => {
    return new Response(res.body, {
      headers: {
        "content-type": res.headers.get("content-type"),
      },
    })
  })
}
