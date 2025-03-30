'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '~/components/ui/twemoji'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  const el = useRef(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current?.destroy()
      typed.current = createTypedInstance(el.current)
    }
  }, [])

  return (
    <div
      className={clsx([
        'flex min-h-8 items-center gap-0.5',
        [
          '[&_.typed-cursor]:inline-block',
          '[&_.typed-cursor]:w-2',
          '[&_.typed-cursor]:h-5.5',
          '[&_.typed-cursor]:text-transparent',
          '[&_.typed-cursor]:bg-slate-800',
          'dark:[&_.typed-cursor]:bg-slate-100',
        ],
      ])}
    >
      <ul id="bios" className="hidden">
        <li>
          Born and Lives in <b className="font-medium">Guilin, China</b>.
        </li>
        <li>
          A crazy fun of <b>The Blue May</b>.
        </li>
        <li>
          The first programming language I learned was <b className="font-medium">PHP</b> !
        </li>
        <li>C# will be my next great langueage.</li>
        <li>A lazy-person in some moments.</li>
        <li>
          Detests repeated work and advocates for <b>automation</b>.
        </li>
        <li>
          A volleyball lover, bacause all.
          <span className="ml-1">
            <Twemoji emoji="volleyball" />
          </span>
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
