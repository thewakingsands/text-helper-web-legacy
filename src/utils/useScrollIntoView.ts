import { useEffect } from 'react'

export function useScrollIntoView(selector: string, deps: any[]) {
  useEffect(() => {
    if (selector) {
      requestAnimationFrame(() => {
        const dom: HTMLElement = document.querySelector(selector)
        if (dom) {
          document.scrollingElement.scrollTo({
            top: dom.offsetTop,
            behavior: 'smooth'
          })
        }
      })
    }
  }, deps)
}
