import clsx from 'clsx'
import type { BrandsMap } from '~/components/ui/brand'
import { Brand } from '~/components/ui/brand'
import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { RadiantCard } from '~/components/ui/radiant-card'
import type { PROJECTS } from '~/data/projects'
import type { GithubRepository } from '~/types/data'
import { RepoMeta } from './repo-meta'
import { Image } from '~/components/ui/image'

export function ProjectCard({
  project,
  reversed,
  hideImage,
  isGridLayout = false,
}: {
  project: (typeof PROJECTS)[0]
  reversed?: boolean
  hideImage?: boolean
  isGridLayout?: boolean
}) {
  const { title, description, imgSrc, url, repo, builtWith } = project
  const repository = repo as GithubRepository
  const href = repository?.url || url
  const shouldHideImage = hideImage || !imgSrc || imgSrc === '/'

  if (isGridLayout) {
    return (
      <RadiantCard className="flex h-full flex-col overflow-hidden">
        {!shouldHideImage && (
          <div className="h-48 w-full overflow-hidden">
            <GradientBorder className="h-full rounded-t-2xl">
              <Image
                src={imgSrc}
                alt={title}
                width={400}
                height={225}
                className="h-full w-full rounded-t-2xl object-cover"
              />
            </GradientBorder>
          </div>
        )}
        <div className="flex grow flex-col justify-between space-y-4 p-4">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold leading-tight">
              {href ? (
                <Link href={href} aria-label={`Link to ${title}`}>
                  <GrowingUnderline data-umami-event="project-title-link">{title}</GrowingUnderline>
                </Link>
              ) : (
                title
              )}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {builtWith?.map((tool) => (
                <Brand
                  key={tool}
                  name={tool as keyof typeof BrandsMap}
                  iconClassName="h-4 w-4 md:h-5 md:w-5"
                />
              ))}
            </div>
            <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
              {repository?.description || description}
            </p>
          </div>
          {repository ? (
            <RepoMeta repo={repository} />
          ) : (
            url &&
            url !== '/' && (
              <Link
                href={url}
                className="text-sm font-medium leading-6"
                aria-label={`Link to ${title}`}
              >
                <GrowingUnderline data-umami-event="project-learn-more">
                  Learn More &rarr;
                </GrowingUnderline>
              </Link>
            )
          )}
        </div>
      </RadiantCard>
    )
  }

  return (
    <RadiantCard
      className={clsx([
        'flex flex-col gap-6 p-4 md:h-80 md:flex-row md:gap-12 md:p-8',
        reversed && 'md:flex-row-reverse',
      ])}
    >
      {!shouldHideImage && (
        <div className="flex h-56 items-end sm:h-80 md:h-auto md:w-1/2">
          <GradientBorder className="rounded-2xl">
            <Image
              src={imgSrc}
              alt={title}
              width={858}
              height={504}
              className="h-full w-full rounded-2xl shadow-lg"
            />
          </GradientBorder>
        </div>
      )}
      <div
        className={clsx(
          'flex grow flex-col justify-between space-y-6 pb-1 md:pb-0',
          shouldHideImage ? 'w-full' : 'md:w-1/2'
        )}
      >
        <div className="space-y-4">
          <h2 className="text-[1.75rem] font-semibold leading-8">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <GrowingUnderline data-umami-event="project-title-link">{title}</GrowingUnderline>
              </Link>
            ) : (
              title
            )}
          </h2>
          <div className="max-w-none space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {builtWith?.map((tool) => {
                return (
                  <Brand
                    key={tool}
                    name={tool as keyof typeof BrandsMap}
                    iconClassName={clsx(
                      tool === 'Pygame' ? 'h-5 md:h-5.5' : 'h-5 w-5 md:h-5.5 md:w-5.5'
                    )}
                  />
                )
              })}
            </div>
            <p className="line-clamp-3 text-gray-600 dark:text-gray-400">
              {repository?.description || description}
            </p>
          </div>
        </div>
        {repository ? (
          <RepoMeta repo={repository} />
        ) : (
          url &&
          url !== '/' && (
            <Link
              href={url}
              className="text-base font-medium leading-6"
              aria-label={`Link to ${title}`}
            >
              <GrowingUnderline data-umami-event="project-learn-more">
                Learn More &rarr;
              </GrowingUnderline>
            </Link>
          )
        )}
      </div>
    </RadiantCard>
  )
}
