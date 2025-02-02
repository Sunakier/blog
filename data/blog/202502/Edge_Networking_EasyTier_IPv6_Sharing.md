---
title: '玩客云再利用：真·边缘组网设备——基于 EasyTier 的跨运营商组网共享 IPV6 策略'
date: '2025-02-02'
tags: [ 'Tech' ]
draft: false
summary: '记录一次利用玩客云设备作为边缘组网设备，以 EasyTier 作为核心通信组建 SD-WAN 网络，通过Docker中的OpenWrt进行流量转发，实现在电信公网IPv4环境下共享中国移动宽带的IPv6资源的尝试'
authors: [ 'default' ]
---

# 前言
早年通过客服为家里的电信宽带获取了动态公网 IPV4 ，随着 IPV6 的推进，越来越多网站接入了 IPV6 支持，即使离 ipv6-only 时代还有一段距离，但 ipv6 已经出现在各方各面  

已经眼馋 ipv6 挺久了，可惜广西电信一直不提供双栈双公网接入，至于说放弃公网 ipv4 ，这对于目前还是不太可接受的方案，所以决定使用隧道接入，此前尝试过 HE.NET 的 6in4 隧道，但是远在漂亮国的入口延迟实在是，有点难绷，所以这次是使用中国移动的 IPV6  

# 正题

## 准备

本次使用的设备是基于 Amlogic_s805 (armv7l) 的矿渣玩客云，对于这个设备网络已经有太多的评测了，就不对赘述了，使用它的原因主要是足够便宜，并且有一个千兆网口，虽然这颗 s805 无法跑满千兆网卡，况且作为旁路还要打对折，实际速率大约 300Mbps 左右，但是对于我的业务场景已经够用了  

对于玩客云我刷的是 hzyitc 大的 Armbian-unofficial_24.5.0-trunk_Onecloud_jammy_current_6.6.21 ，使用的 EasyTier 版本为 v2.1.2-2769cabc，使用的 OpenWrt 的 Docker 镜像是 14790897/openwrt:onecloud，镜像从 Docker Hub 拉取

## 拓补

其实这拓补图很清晰了，但是还是画一下

![整体拓补图](static/images/blog/202502/Edge_Networking_EasyTier_IPv6_Sharing/PixPin_2025-02-02_23-27-27.png)

(待续...)
