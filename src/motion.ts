import { useEffect, useLayoutEffect, type RefObject } from 'react'

// useLayoutEffect warns during renderToString; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Blocks that fade/slide in as they scroll into view. */
const REVEAL_SELECTOR = [
  '.section-head',
  '.grid-cards > .card',
  '.grid-2-cards > .mode-card',
  '.grid-steps > .step',
  '.grid-plans > .plan',
  '.req-grid > div:first-child',
  '.req-card',
  '.quote-card',
  '.faq',
  '.channel',
  '.form-card',
  '.announcement-copy',
  '.pos-shot',
  '.instagram-card',
  '.cta-inner',
  '.post-card',
].join(',')

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Scroll reveal for the current page. Content is visible by default (prerendered
 * HTML, no JS, reduced motion); only once this runs are below-the-fold blocks
 * hidden and then revealed by an IntersectionObserver. Blocks already on screen
 * are marked revealed before the first paint so nothing flickers.
 */
export function useScrollReveal(key: unknown) {
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return

    const root = document.documentElement
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
    const vh = window.innerHeight

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    for (const el of targets) {
      // Stagger siblings that share a grid/list (capped in CSS).
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
      el.style.setProperty('--reveal-i', String(Math.max(0, siblings.indexOf(el))))
      el.classList.add('reveal')
      if (el.getBoundingClientRect().top < vh) el.classList.add('is-in')
      else io.observe(el)
    }
    root.classList.add('motion-ok')

    return () => {
      io.disconnect()
      root.classList.remove('motion-ok')
    }
  }, [key])
}

/** Subtle 3D tilt that follows the pointer (mouse/trackpad only). */
export function usePointerTilt(ref: RefObject<HTMLElement>, maxDeg = 5) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-x', `${(-y * maxDeg).toFixed(2)}deg`)
        el.style.setProperty('--tilt-y', `${(x * maxDeg).toFixed(2)}deg`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, maxDeg])
}
