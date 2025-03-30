import type { Project } from '~/types/data'

export const PROJECTS: Project[] = [
  {
    type: 'self',
    title: 'qjplus',
    description: `Python-Based and Selenium-Based 2-class Automatic Solution`,
    imgSrc: '/static/images/projects/AVP2.svg',
    url: '/',
    // demo: <AvpDemo />,
    builtWith: ['Python', 'JavaScript'],
  },
  {
    type: 'self',
    title: '[Private] PufaPlusPro',
    description: `Python-Based Solution for Protocols on 教育部全国青少年普法网 (qspfw.moe.gov.cn)`,
    imgSrc: '/static/images/projects/aone.jpg',
    url: '/',
    builtWith: ['Python', 'JavaScript'],
  },
  {
    type: 'self',
    title: 'SWgetter',
    description: `A Seewo Application Version Tracker`,
    imgSrc: '/static/images/projects/iapp_lite.jpg',
    url: 'https://swapp.57777777.xyz',
    builtWith: ['Python', 'JavaScript'],
  },
  {
    type: 'self',
    title: 'FileTool',
    description: `EasyBasic File Synchronization Tool Based on Python with C/S Architecture`,
    imgSrc: '/static/images/projects/moonfox-top.jpg',
    url: '/',
    builtWith: ['Python', 'JavaScript'],
  },
]
