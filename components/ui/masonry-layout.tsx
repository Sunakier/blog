'use client'

import { useEffect, useRef, useState } from 'react'

interface MasonryLayoutProps {
  children: React.ReactNode
  columnCount?: number
  columnGap?: number
  className?: string
}

/**
 * 真正的瀑布流布局组件
 * 动态计算每个子元素的高度，并将其放置在当前高度最小的列中
 */
export function MasonryLayout({
  children,
  columnCount = 3,
  columnGap = 32, // 2rem
  className = '',
}: MasonryLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  // 添加加载状态控制
  const [isLoading, setIsLoading] = useState(true)

  // 根据屏幕宽度动态调整列数
  const getResponsiveColumnCount = () => {
    if (typeof window === 'undefined') return columnCount
    const width = window.innerWidth
    if (width < 768) return 1 // 移动设备单列
    if (width < 1280) return 2 // 平板设备两列
    return columnCount // 默认列数（大屏幕）
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      applyMasonry()
    })

    resizeObserver.observe(container)

    // 初始化瀑布流布局
    setTimeout(() => {
      applyMasonry()
      // 布局计算完成后，设置加载状态为false
      setIsLoading(false)
    }, 100) // 短暂延迟确保DOM已完全渲染

    return () => {
      resizeObserver.disconnect()
    }
  }, [children])

  // 应用瀑布流布局
  const applyMasonry = () => {
    const container = containerRef.current
    const items = itemsRef.current
    if (!container || !items.length) return

    // 获取响应式列数
    const responsiveColumnCount = getResponsiveColumnCount()

    // 计算列宽
    const containerWidth = container.offsetWidth
    const columnWidth =
      (containerWidth - (responsiveColumnCount - 1) * columnGap) / responsiveColumnCount

    // 初始化列高度数组
    const columnHeights = Array(responsiveColumnCount).fill(0)

    // 重置所有项目的位置
    items.forEach((item) => {
      // 找出当前高度最小的列
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights))

      // 计算位置
      const xPos = minHeightIndex * (columnWidth + columnGap)
      const yPos = columnHeights[minHeightIndex]

      // 应用位置
      item.style.position = 'absolute'
      item.style.width = `${columnWidth}px`
      item.style.transform = `translateX(${xPos}px) translateY(${yPos}px)`
      item.style.transition = 'transform 0.3s ease'

      // 更新列高度
      columnHeights[minHeightIndex] += item.offsetHeight + columnGap
    })

    // 更新容器高度
    container.style.height = `${Math.max(...columnHeights)}px`
  }

  // 将子元素包装在div中以便引用
  const wrappedChildren = Array.isArray(children)
    ? children.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) itemsRef.current[index] = el
          }}
          className={`masonry-item ${isLoading ? 'masonry-item-loading' : 'masonry-item-loaded'}`}
          style={{
            position: 'absolute',
            width: '100%',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {child}
        </div>
      ))
    : children

  return (
    <div
      ref={containerRef}
      className={`masonry-grid relative ${className}`}
      style={{ position: 'relative', width: '100%', minHeight: '200px' }}
    >
      {isLoading && (
        <div className="masonry-loading-overlay">
          <div className="masonry-loading-placeholder"></div>
        </div>
      )}
      {wrappedChildren}
    </div>
  )
}
