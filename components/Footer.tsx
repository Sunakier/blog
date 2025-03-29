import { siteMetadata } from '~/data/siteMetadata'
import { BuiltWith } from './BuiltWith'

export function Footer() {
  return (
    <footer>
      <div className="items-center justify-between mt-16 mb-8 space-y-4 md:mb-10 md:flex md:space-y-0">
        <BuiltWith />
        <div></div>
        <div className="flex my-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <span>{siteMetadata.footerTitle}</span>
          <span>{` • `}</span>
          <a
            href="https://icp.gov.moe/?keyword=20255777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            萌ICP备20255777号
          </a>
        </div>
      </div>
    </footer>
  )
}
