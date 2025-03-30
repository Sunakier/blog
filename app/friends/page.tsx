import { genPageMetadata } from '~/app/seo'
import { PageHeader } from '~/components/ui/page-header'
import { Container } from '~/components/ui/container'
import { FriendsList } from './friends-list'
import friends from '~/json/friends.json' assert { type: 'json' }

// const MAX_POSTS_DISPLAY = 5

export const metadata = genPageMetadata({ title: 'My friends and tech bloggers' })

export default async function HomePage() {
  const friendsList = friends.filter((f) => f.type === 'friend')
  const bloggersList = friends.filter((f) => f.type === 'techStar')

  return (
    <Container as="div" className="pt-4 lg:pt-12">
      <PageHeader
        title="Friends"
        description="My friends and the tech bloggers I recommend."
        className="border-b border-gray-200 dark:border-gray-700"
      />

      {friendsList.length > 0 && (
        <div className="py-5 md:py-10">
          <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
            Friends
          </h3>
          <div className="space-y-16">
            <FriendsList friends={friendsList} />
          </div>
        </div>
      )}

      {bloggersList.length > 0 && (
        <div
          className={`${friendsList.length > 0 ? 'mt-6 border-t border-gray-200 dark:border-gray-700' : ''} py-5 md:${friendsList.length > 0 ? 'mt-10' : ''} md:py-10`}
        >
          <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:mb-8 md:text-3xl">
            Technical bloggers
          </h3>
          <div className="space-y-16">
            <FriendsList friends={bloggersList} />
          </div>
        </div>
      )}

      {friendsList.length === 0 && bloggersList.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">There is no friends ...</p>
        </div>
      )}
    </Container>
  )
}
