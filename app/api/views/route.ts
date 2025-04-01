import { NextResponse } from 'next/server'
import { __db } from '~/server/prisma.server'

export async function GET(req: Request) {
  // 检查是否配置了数据库
  if (process.env.IS_DATABASE_CONFIGURED !== 'true') {
    return NextResponse.json({
      total: '0',
    })
  }

  const totalViews = await __db.views.aggregate({
    _sum: {
      count: true,
    },
  })

  return NextResponse.json({
    total: totalViews._sum.count?.toString(),
  })
}
