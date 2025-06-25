import * as React from "react"

const breakpoints = {
  '2xl': 1536,
  'xl': 1280,
  'lg': 1024,
  'md': 768,
  'sm': 640,
  'xs': 0,
} as const

type Breakpoint = keyof typeof breakpoints

const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('xs')

  React.useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth
      if (width >= breakpoints['2xl']) return '2xl'
      if (width >= breakpoints['xl']) return 'xl'
      if (width >= breakpoints['lg']) return 'lg'
      if (width >= breakpoints['md']) return 'md'
      if (width >= breakpoints['sm']) return 'sm'
      return 'xs'
    }

    const handleResize = () => setBreakpoint(getBreakpoint())

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}


export function isBreakpointAtOrAbove(current: Breakpoint, target: Breakpoint) {
  return breakpointOrder.indexOf(current) >= breakpointOrder.indexOf(target)
}

export function isBreakpointBelow(current: Breakpoint, target: Breakpoint) {
  return breakpointOrder.indexOf(current) < breakpointOrder.indexOf(target)
}