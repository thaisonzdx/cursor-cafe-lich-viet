"use client"

import { useCallback, useRef } from "react"
import { Sun, Moon, Flower2, Gem } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"
import { themes, type ThemeKey } from "@/lib/themes"

const THEME_ICONS: Record<ThemeKey, React.ComponentType<{ className?: string }>> = {
  light: Sun,
  dark: Moon,
  lotus: Flower2,
  jade: Gem,
}

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const cycleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const currentIndex = themes.findIndex((t) => t.key === theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    const supportsViewTransition =
      typeof document !== "undefined" &&
      "startViewTransition" in document

    if (supportsViewTransition) {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme.key)
        })
      })

      await transition.ready

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } else {
      setTheme(nextTheme.key)
    }
  }, [theme, setTheme, duration])

  const Icon = THEME_ICONS[theme]

  return (
    <button
      ref={buttonRef}
      onClick={cycleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Đổi giao diện</span>
    </button>
  )
}
