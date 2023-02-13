"use client"

import { useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { toPng, toBlob } from "html-to-image"
import { copyBlobToClipboard } from "copy-image-clipboard"
import { Dicts } from "../dicts"
import { useRouter } from "next/navigation"
import { getImageUrl } from "../lib/utils"
import { ChooseTechnologyDialogContent } from "./ChooseTechnologyDialogContent"

type GridItemType = { name: string; technology?: Technology; tip?: string }

const GridItem = ({
  item,
  setTechnology,
}: {
  item: GridItemType
  setTechnology: (item: Technology | undefined) => void
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="border-[3px] border-black w-full flex flex-col justify-between items-center">
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="w-full aspect-square flex items-center justify-center hover:bg-gray-100"
          >
            {item.technology?.icon ? (
              <img
                src={getImageUrl(item.technology.icon)}
                className="w-[50%]"
              />
            ) : (
              <div className="w-full text-xs h-full p-5 flex items-center justify-center text-gray-300 md:text-xl">
                {item.tip}
              </div>
            )}
          </button>
        </Dialog.Trigger>
        <ChooseTechnologyDialogContent
          open={openDialog}
          setOpen={setOpenDialog}
          setTechnology={setTechnology}
        />
      </Dialog.Root>
      <div className="h-10 flex items-center md:text-2xl border-gray-300 font-bold border-t-[3px] w-full justify-center text-center px-2 text-xs break-all">
        {item.name}
      </div>
    </div>
  )
}

export const Grid = ({ dicts, lang }: { dicts: Dicts; lang: string }) => {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<GridItemType[]>([
    {
      name: dicts["gateway-project"],
      technology: {
        icon: "vue.svg",
        name: "vue",
      },
    },
    {
      name: dicts["most-recommended"],
      technology: {
        icon: "https://trpc.io/img/logo-text-black.svg",
        name: "trpc",
      },
    },
    {
      name: dicts["most-experienced"],
    },
    {
      name: dicts["most-challenging"],
    },
    {
      name: dicts["most-overrated"],
    },
    {
      name: dicts["most-underrated"],
    },
    {
      name: dicts["most-want-to-learn"],
    },
    {
      name: dicts["most-hated"],
    },
    {
      name: dicts["gulty-pleasure"],
      tip: dicts["gulty-pleasure-description"],
    },
  ])

  const setTechnology = (index: number, technology: Technology | undefined) => {
    setItems((items) =>
      items.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            technology,
          }
        }
        return item
      })
    )
  }

  const downloadImage = async () => {
    const dataUrl = await toPng(wrapperRef.current, {
      includeQueryParams: true,
    })
    const link = document.createElement("a")
    link.download = `developer-3x3.png`
    link.href = dataUrl
    link.click()
  }

  const copyImage = async () => {
    const blob = await toBlob(wrapperRef.current, {
      includeQueryParams: true,
    })
    await copyBlobToClipboard(blob)
  }

  return (
    <div>
      <div className="bg-white p-5" ref={wrapperRef}>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item, index) => {
            return (
              <GridItem
                key={index}
                item={item}
                setTechnology={(item) => setTechnology(index, item)}
              />
            )
          })}
        </div>
      </div>
      <div className="mt-5 px-5 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="flex gap-3">
          <button
            type="button"
            className="flex h-12 items-center px-3 bg-black text-white hover:bg-gray-800 active:ring-2 ring-zinc-300"
            onClick={downloadImage}
          >
            {dicts["download-image"]}
          </button>
          <button
            type="button"
            className="flex h-12 items-center px-3 border-2 border-black hover:bg-gray-100 active:bg-gray-200"
            onClick={copyImage}
          >
            {dicts["copy-image"]}
          </button>
        </div>

        <div className="text-center flex items-center justify-center gap-2">
          <select
            value={lang}
            className="border rounded-lg border-gray-300 bg-gray-100 h-8 inline-flex items-center"
            onChange={(e) => router.push(`/${e.target.value}`)}
          >
            <option value="en">English</option>
            <option value="zh-cn">简体中文</option>
          </select>
          <a
            href="https://github.com/sponsors/egoist"
            target="_blank"
            rel="noopener nofollow"
            className="h-8 gap-1 bg-black text-white rounded-lg inline-flex px-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-red-500"
              width="1em"
              height="1em"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>

            <span>made by egoist</span>
          </a>
          <a
            href="https://twitter.com/poorlybatched"
            target="_blank"
            rel="noopener nofollow"
            className="h-8 gap-1 bg-sky-500 text-white rounded-lg inline-flex px-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M496 109.5a201.8 201.8 0 0 1-56.55 15.3a97.51 97.51 0 0 0 43.33-53.6a197.74 197.74 0 0 1-62.56 23.5A99.14 99.14 0 0 0 348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 0 0 2.54 22.1a280.7 280.7 0 0 1-203-101.3A95.69 95.69 0 0 0 36 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0 1 35.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 0 1-25.94 3.4a94.38 94.38 0 0 1-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0 1 39.5 405.6a203 203 0 0 1-23.5-1.4A278.68 278.68 0 0 0 166.74 448c181.36 0 280.44-147.7 280.44-275.8c0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 0 0 496 109.5Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
