# 配图显示控制功能使用指南

在博客文章中，现在可以通过元数据控制配图的显示方式。这个功能允许你决定配图是否在文章内顶部显示，以及是否在小屏设备上显示。

## 可用参数

在文章的前置元数据中，你可以使用以下两个参数：

1. `showBannerInArticle`: 控制配图是否在文章内顶部显示

   - 默认值: `true`
   - 设置为 `false` 时，配图将不会在文章中显示

2. `showBannerOnMobile`: 控制配图是否在小屏设备上显示
   - 默认值: `true`
   - 设置为 `false` 时，配图将只在中等及以上尺寸的屏幕上显示
   - 此参数同时影响：
     - 文章列表中的文章缩略图显示
     - 文章内部顶部的配图显示

## 使用示例

以下是一个使用这些参数的示例：

```markdown
---
title: '我的博客文章'
date: '2023-01-01'
tags: ['示例', '教程']
images: ['/static/images/example.jpg']
showBannerInArticle: true
showBannerOnMobile: false
---

文章内容...
```

在上面的例子中，配图将会在文章顶部显示，但在移动设备上会被隐藏。

## 注意事项

- 这两个参数都是可选的，如果不指定，默认值都是 `true`
- 如果 `showBannerInArticle` 设置为 `false`，则 `showBannerOnMobile` 参数在文章内部将不起作用，因为配图根本不会显示
- `showBannerInArticle` 参数只影响文章内的配图显示，不会影响文章列表中的缩略图显示
- `showBannerOnMobile` 参数同时影响文章内的配图显示和文章列表中的缩略图显示
