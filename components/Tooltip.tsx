"use client"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { forwardRef } from "react"

export const TooltipProvider = RadixTooltip.Provider

export const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode
  content?: React.ReactNode
}) => {
  if (!content) return <>{children}</>
  return (
    <RadixTooltip.Root delayDuration={200}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className="TooltipContent" sideOffset={5}>
          {content}
          <RadixTooltip.Arrow className="TooltipArrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
