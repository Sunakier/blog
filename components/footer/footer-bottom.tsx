import { clsx } from 'clsx'
import { AreaChart, Rss } from 'lucide-react'
import { Link } from '~/components/ui/link'
//import { SpotifyNowPlaying } from '~/components/ui/now-playing'
import { SITE_METADATA } from '~/data/site-metadata'

export function FooterBottom() {
  return (
    <div
      className={clsx([
        'pt-5 md:my-2',
        'flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-16',
        'border-t border-gray-200 dark:border-gray-700',
      ])}
    >
      {/*<SpotifyNowPlaying
        className="w-full justify-center truncate [--artist-color:theme(colors.gray.500)] md:max-w-[50%] md:justify-start"
        songEffect="underline"
        showCover
      />*/}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/feed.xml" aria-label="RSS Feed" data-umami-event="rss-feed" prefetch={false}>
            <Rss strokeWidth={1.5} size={20} />
          </Link>
          <Link
            href={SITE_METADATA.analytics.umamiAnalytics.shareUrl}
            aria-label="Open analytics"
            data-umami-event="nav-analytics"
          >
            <AreaChart strokeWidth={1.5} size={22} />
          </Link>
        </div>
        <a
          href="https://icp.gov.moe/?keyword=20255777"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          萌ICP备20255777号
        </a>
      </div>
    </div>
  )
}
