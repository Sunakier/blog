import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { ProfileCard } from '~/components/cards/profile'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { TableOfContents } from '~/components/blog/toc'

interface Props {
  children?: ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'> & { toc?: any }
}

export function AuthorLayout({ children, content }: Props) {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="About"
        description="More about me and this blog."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-8 md:grid md:grid-cols-3">
        <div className="space-y-24 pr-4">
          <ProfileCard />
          {content.toc && content.toc.length > 0 && (
            <div className="sticky top-24 hidden border-t border-gray-200 pt-4 dark:border-gray-700 lg:block">
              <TableOfContents toc={content.toc} />
            </div>
          )}
        </div>
        <div className="md:col-span-2 md:pl-12 xl:pl-16">
          <div className="prose prose-lg dark:prose-invert">{children}</div>
        </div>
      </div>
    </Container>
  )
}
