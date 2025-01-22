"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'end'
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}>({ isOpen: false, setIsOpen: () => {} })

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={cn("inline-flex items-center justify-center cursor-pointer", className)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsOpen(!isOpen)
        }
      }}
    >
      {children}
    </div>
  )
}

export function DropdownMenuContent({ 
  children, 
  className,
  align = 'end' 
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
        "animate-in data-[side=bottom]:slide-in-from-top-2",
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ 
  children, 
  className,
  onClick,
  disabled = false
}: DropdownMenuItemProps) {
  const { setIsOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
      setIsOpen(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-slate-100 focus:bg-slate-100",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-slate-200" />
}

export function DropdownMenuLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
      {children}
    </div>
  )
}

export function DropdownMenuShortcut({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
      {children}
    </span>
  )
}

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

export function DropdownMenuSubTrigger({ children, className }: DropdownMenuItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between px-2 py-1.5 text-sm",
        "hover:bg-slate-100 focus:bg-slate-100",
        className
      )}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </button>
  )
}

export function DropdownMenuSubContent({ children, className }: DropdownMenuContentProps) {
  return (
    <div className={cn(
      "absolute left-full top-0 z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
      className
    )}>
      {children}
    </div>
  )
} 