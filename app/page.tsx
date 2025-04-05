import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { Home } from '~/components/home-page'
import { SITE_METADATA } from '~/data/site-metadata'

export default async function HomePage() {
  return (
    <Home posts={allCoreContent(sortPosts(allBlogs)).slice(0, SITE_METADATA.homepagePostCount)} />
  )
}
