"use client"

import { forwardRef, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"
import Fuse from "fuse.js"
import { useForm } from "react-hook-form"
import * as Tabs from "@radix-ui/react-tabs"
import * as Dialog from "@radix-ui/react-dialog"
import technologies from "../generated/technologies"
import { getImageUrl } from "../lib/utils"

export const ChooseTechnologyDialogContent = forwardRef<
  HTMLDivElement,
  {
    setTechnology: (item: Technology | undefined) => void
    open: boolean
    setOpen: (open: boolean) => void
  }
>(({ setTechnology, setOpen }, ref) => {
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 300)
  const fuse = useMemo(
    () => new Fuse(technologies, { keys: ["name", "desc"] }),
    []
  )
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      imageUrl: "",
    },
  })

  const result = useMemo(() => {
    return fuse.search(debouncedKeyword, { limit: 25 })
  }, [debouncedKeyword, fuse])
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content ref={ref} className="DialogContent">
        <Tabs.Root defaultValue="default">
          <Tabs.List className="px-5 pt-4 flex gap-3 text-zinc-400">
            <Tabs.Trigger
              value="default"
              className="hover:text-zinc-600 aria-selected:text-black"
            >
              Default
            </Tabs.Trigger>
            <Tabs.Trigger
              value="custom"
              className="hover:text-zinc-600 aria-selected:text-black"
            >
              Custom Image
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="default">
            <div>
              <div className="p-5 flex items-center gap-2">
                <input
                  className="input"
                  placeholder="Search technology..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="border rounded-lg h-10 px-2 active:ring-2 ring-blue-500 active:border-blue-500"
                    onClick={() => setTechnology(undefined)}
                  >
                    Remove
                  </button>
                </Dialog.Close>
              </div>
              <div className="max-h-[40vh] overflow-auto p-5">
                {result.length === 0 ? (
                  <div className="text-center min-h-[200px] flex items-center justify-center text-zinc-400">
                    empty result
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-3">
                    {result.map((item) => {
                      return (
                        <div key={item.item.name}>
                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="w-full aspect-square flex items-center justify-center hover:bg-gray-100 rounded-lg"
                              onClick={() => setTechnology(item.item)}
                            >
                              {item.item.icon ? (
                                <img
                                  src={getImageUrl(item.item.icon)}
                                  className="w-10"
                                />
                              ) : (
                                <div className="w-full h-full"></div>
                              )}
                            </button>
                          </Dialog.Close>
                          <div
                            className="text-xs text-center break-all mt-1"
                            title={item.item.desc}
                          >
                            {item.item.name}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="custom" className="">
            <form
              className="p-5"
              onSubmit={handleSubmit((values) => {
                setTechnology({
                  name: "custom",
                  icon: values.imageUrl,
                })
                reset()
                setOpen(false)
              })}
            >
              <div>
                <label className="flex mb-1">Image URL</label>
                <input
                  type="url"
                  className="input"
                  required
                  {...register("imageUrl")}
                />
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="bg-zinc-200 border border-zinc-300 h-8 inline-flex items-center px-2 rounded-lg active:ring-2 ring-blue-500 active:border-blue-500 hover:bg-zinc-300"
                >
                  Save
                </button>
              </div>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Portal>
  )
})
