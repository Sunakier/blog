import { genPageMetadata } from 'app/seo'
import { ProjectCard } from '~/components/cards/project'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { PROJECTS } from '~/data/projects'
import { fetchRepoData } from '~/server/github.server'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  await Promise.all(
    PROJECTS.map(async (p) => {
      if (p.repo) {
        p.repo = await fetchRepoData(p.repo as string)
      }
    })
  )
  const workProjects = PROJECTS.filter(({ type }) => type === 'work')
  const sideProjects = PROJECTS.filter(({ type }) => type === 'self')

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Projects"
        description="Collections of my open-source side projects, along with some cool things I've built with colleagues at work. It's a mix of passion projects and practical tools—some just for fun, others to solve real-world problems."
        className="border-b border-gray-200 dark:border-gray-700"
      />

      {workProjects.length > 0 && (
        <div className="py-5 md:py-10">
          <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
            Work
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workProjects.map((pro, idx) => (
              <ProjectCard key={pro.title} project={pro} isGridLayout={true} />
            ))}
          </div>
        </div>
      )}

      {sideProjects.length > 0 && (
        <div
          className={`${workProjects.length > 0 ? 'mt-6 border-t border-gray-200 dark:border-gray-700' : ''} py-5 md:py-10`}
        >
          <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:mb-8 md:text-3xl">
            Side projects
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sideProjects.map((pro, idx) => (
              <ProjectCard key={pro.title} project={pro} isGridLayout={true} />
            ))}
          </div>
        </div>
      )}

      {workProjects.length === 0 && sideProjects.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">暂无项目</p>
        </div>
      )}
    </Container>
  )
}
