import { clsx } from 'clsx'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { GritBackground } from '~/components/ui/grit-background'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { SITE_METADATA } from '~/data/site-metadata'

export function PostCardGridView({ post }: { post: CoreContent<Blog> }) {
  const { path, date, title, summary, images, readingTime, showBannerOnMobile } = post
  const hasImages = images && images.length > 0
  // 确定是否在移动端显示图片，默认为true
  const showOnMobile = showBannerOnMobile !== false

  return (
    <article className="h-full">
      <div className="flex h-full flex-col items-start justify-between gap-4 md:gap-6">
        <div className="w-full space-y-3">
          <div className="flex items-center gap-x-1.5 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="mx-1 text-gray-400">/</span>
            <span>{Math.ceil(readingTime.minutes)} mins read</span>
          </div>
          <div className="group relative">
            <h3 className="text-xl font-semibold leading-6">
              <Link href={`/${path}`}>
                <GrowingUnderline>{title}</GrowingUnderline>
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-500 md:mt-3">
              {summary}
            </p>
          </div>
        </div>
        {hasImages && (
          <Link
            href={`/${path}`}
            className={clsx([
              'relative block shrink-0',
              'h-auto w-full md:aspect-[3/2]',
              'pb-3 pl-0 pr-3 pt-0',
              'transition-all ease-in-out hover:pb-2 hover:pl-1 hover:pr-2 hover:pt-1',
              // 根据showOnMobile参数控制在移动端的显示
              !showOnMobile && 'hidden md:block',
            ])}
          >
            <Image
              src={images[0]}
              alt={title}
              width={600}
              height={400}
              className="aspect-video h-full w-full rounded-xl shadow-2xl"
            />
            <GritBackground
              className={clsx([
                'bottom-0 left-3 right-0 top-3',
                'rounded-xl border-2 border-gray-800 dark:border-gray-400',
              ])}
            />
          </Link>
        )}
      </div>
    </article>
  )
}
