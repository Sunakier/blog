import { MoveLeft } from 'lucide-react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'

export function BackToPosts({
  label,
  className,
  slug,
}: {
  label: string
  className?: string
  slug?: string
}) {
  const href = slug ? `/blog#blog-${slug}` : '/blog'

  return (
    <div className={className}>
      <Link href={href} className="flex w-fit items-center gap-3">
        <MoveLeft strokeWidth={1.5} />
        <GrowingUnderline data-umami-event="back-to-posts">{label}</GrowingUnderline>
      </Link>
    </div>
  )
}
