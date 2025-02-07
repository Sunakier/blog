---
title: 'CMCC RAX3000Me：拆机TTL刷机并刷入自编译带 MTK 硬件加速的 ImmortalWrt 固件'
date: '2025-02-07'
tags: [ 'Tech' ]
draft: false
summary: '完整的对于 CMCC RAX3000Me 的拆机 TTL 刷入并刷入自编译带 MTK 硬件加速的 ImmortalWrt 固件流程'
authors: [ 'default' ]
---

# 前言
之前入了 IPQ5018 的 CMCC RAX3000QY，为了硬件加速一直使用的是 Nwrt 的固件，因为bug实在太多（莫名其妙的交换机就直通到上级网关，Nwrt 团队也几乎没有更新），生态也是一言难尽（要啥没啥，没有NSS部分源码没法编译对应内核），上个星期换了 Lean 的固件，可惜高版本内核没有完全体的 NSS 加速，比较蛋疼，但是实测下来也没有那么不堪，CPU 占用稍高，温度稍高  

扯远了，这次在小黄鱼花了 75 收了一台 CMCC RAX3000Me，这个机器应该是 CMCC RAX3000M 的后续，外观抄菊花 AX3P，说实话确实好看，但又和 RAX3000M 有些许不同  

我手上这台机器来自广东地区，MT7981方案，512MB RAM，128MB SPI NAND，无 USB 版本，背部标签显示批号是 20240710 CH，可以根据恩山教程使用 TTL 拆机刷入（目前仅有）  

# 正题

## 准备

需要准备内容：
1. USB-TO-TTL 3.3V 一个  
2. 编译好的 MT7981 固件 (我使用了 hanwckf 大佬的 [Immortalwrt-mt798x - Github](https://github.com/hanwckf/immortalwrt-mt798x), 我编译的内容在下面有提供)  
3. 981213 大佬开发的 MTK_UARTBOOT ([981213/mtk_uartboot - Github](https://github.com/981213/mtk_uartboot/releases)) 工具  
4. 用于预引导 uboot 的 bl2 固件 (我使用 暗云 大佬预编译的 MT7981 的 bl2 固件 mt7981-ddr4-bl2.bin（内存类型这里有坑，下面会讲），具体参考 [MediaTek Filogic 系列路由器串口救砖教程 - 暗云 - 博客园](https://www.cnblogs.com/p123/p/18046679))  
5. Uboot 固件，现在 RAX3000M 的版本即可 (我使用了 hanwckf 大佬的 [bl-mt798x - Github](https://github.com/hanwckf/bl-mt798x)，mt7981_cmcc_rax3000m-fip-fixed-parts.bin )  

* 注：上面所有标注链接或者内容均在下面提供有存档版本  

## 编译 Immortalwrt 固件

我使用了一台US 8H16G US Ubuntu 24.02 的 VPS 参照 hanwckf/Immortalwrt-mt798x 主页的编译标准流程进行编译的，详细内容可以参考其 README 内容，这里做一个简单的摘录  

```shell
sudo bash -c 'bash <(curl -sL https://build-scripts.immortalwrt.eu.org/init_build_environment.sh)' # apt 源已经没有 python2 了，稳妥起见使用官方提供的环境脚本
git clone --depth=1 https://github.com/hanwckf/immortalwrt-mt798x.git # 需要畅通的网络
cd immortalwrt-mt798x
./scripts/feeds update -a
./scripts/feeds install -a
cp -f defconfig/mt7981-ax3000.config .config 
make menuconfig # 这里选择目标系统和需要的软件包
make -j$(nproc)
```

对于 RAX3000Me ，编译的时候选择 RAX3000M 的内容即可，两者内容几乎是互通的  

好了，现在我们编译完成拿到了固件  

## 拆机

![背板图](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image.png)

图示，使用吹风机吹4-5分钟，无损撕下标签，背后有两颗螺丝，周围是卡扣，使用撬板在周围大力出奇迹来一圈就很容易拆开  

如果不想拆机，RAX3000Me 的 TTL 串口位置比较友好，大致在图中红框位置，可以尝试使用长脚针或其他方案透过外壳孔隙直接插入连接TTL，其对应从左到右为 GND TX 3.3V RX，请注意，不需要接 VCC(3.3V) 引脚，并且这里发送端和接收端的 TX 和 RX 需要交叉连接，同时应该选用 3.3V 电平，否则可能无法发送内容  

![TTL引脚图](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-1.png)

连接好 TTL 后，可以上电尝试跑码，官方的 Uboot 下会有提示进入 Uboot 控制台的选项，但是这个选项并没有什么卵用，进入后会提示 5s 后恢复出厂设置，然后重启了  

## 加载 Uboot

我们需要依照前面提到的 暗云 大佬的 MTK 救砖教程，使用 mtk_uartboot 引导第三方编译的 **完整功能** 的 Uboot 固件，原教程：[MediaTek Filogic 系列路由器串口救砖教程 - 暗云 - 博客园](https://www.cnblogs.com/p123/p/18046679)  

下面步骤和上面教程描述基本一致，包括我遇到的问题  

按照上面准备工作下载好 bl2 固件和 Uboot 固件，然后使用 mtk_uartboot 引导 Uboot 固件，请注意，这里的 **COM1** 需要替换为你的电脑上对于设备的端口号，Linux 下需要替换为对应设备，**对于此处的的 bl2 固件，部分 RAX3000Me 的设备使用的内存是 DDR3 的（来自恩山部分用户反馈），可能需要随机应变，选择 DDR3 固件**，我手上没有机器就不赘述  

```shell
.\mtk_uartboot.exe -s COM1 -p mt7981-ddr4-bl2.bin -a -fmt7981_cmcc_rax3000m-fip-fixed-parts.bin --brom-load-baudrate 921600--bl2-load-baudrate 1500000
```

如果你出现一直卡在 Handshake 的情况下，尝试检查：  
1. TTL电平是否正确，RAX3000Me 实测使用 1.8V 可以输出，但是如果希望发送数据必须使用 3.3V 电平，~~而 RAX3000QY 则需要 1.8V 电平~~  
2. 引脚是否牢固，可能出现了错接/接触不良等情况导致无法正常通信  

## 固化刷入

对于一次成功的引导，应该如下图所示，看到有类似 *NOTICE:  Received FIP xxxx* 的内容，代表我们已经成功了：

![加载成功标识](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-2.png)

按照 hanwckf 大佬博客中的说明 [mt798x uboot 功能介绍](https://cmi.hanwckf.top/p/immortalwrt-mt798x/) ，我们刷入后使用串口调试工具连接后应该即可看到如图菜单（U-Boot Boot Menu）  

![加载成功后的内容](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-3.png)

但是实际上等我连接之后就只有如下图的 Uboot 的控制台了，此时启用了 HTTP 服务器，可以通过手动配置 IP 地址 192.168.1.0/24 网段的 IP 与路由进行通信

![Uboot控制台-HTTP](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-4.png)

在浏览器中打开，经过尝试发现以下 URL 可用：

```
更新系统固件：http://192.168.1.1 # 必须  
更新 Uboot 固件：http://192.168.1.1/uboot.html # 必须  
更新 BL2 固件：http://192.168.1.1/bl2.html # 可选  
```

![UbootHTTP页面](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-5.png)

同时可以在串口终端中使用 Ctrl+C 结束 HTTP 服务器，使用 TFTP 的方式上传固件，具体方式自行探索，也很简单，这里不过多赘述

![Tftpd64](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-6.png)

奇怪的是，我尝试刷入 BL2 固件的时候，发现 Uboot 提示我的固件部署 BL2 固件，无法通过校验，通过网页或者 TFTP 都是如此，但是测试中不影响使用，就暂时不管了  

这里需要你刷入 Uboot 和系统固件，先刷入 Uboot 然后再刷入系统固件，可以免去一次重新使用 mtk_uartboot 引导 Uboot 固件的过程  

# 结束

你到此为止就已经完成刷入了，需要上面提到的或者更多没有提到的各位大佬的辛勤付出，没有他们的努力，就不会有你我看到的成果  

下图是一台刷入了 immortalwrt-mt798x 项目的固件并且运行了一坤时的 CMCC RAX3000Me 路由发生的变化，路由很好，使我原地旋转（）  

![系统截图](/static/images/blog/202502/CMCC_Rax3000Me_Flash_Openwrt.md/image-7.png)

下面是我本次刷机用到的文件，包括：
1. 引述的上面大佬的教程存档  
2. 我自己编译的 immortalwrt-mt798x 项目的固件，包含常用的内核模块和常用功能，以及对于 ipk 包
3. mtk_uartboot_windows 工具和 mt7981-bl2 固件(由 暗云 大佬编译)
4. CMCC RAX3000M 的 Uboot 固件 mt7981_cmcc_rax3000m-fip-fixed-parts (于 hanwckf 大佬的 Github 仓库下载，见上 )

[GoogleDriver](https://drive.google.com/file/d/1mo_6t46G88srRI6U7xM3E_x6QDWZ4LSY/view?usp=sharing)
[私有天翼云直链](https://alist.57777777.xyz/d/tycl/share_temp/RAX3000ME.zip?sign=n3yK09xxmMdQvidWTFmO6-7B7FD2HQ7vMdn2jgtPNAk=:0)
[天翼云(3dmx)](https://cloud.189.cn/web/share?code=BzaQ7ja6VzUr)
[百度云盘(dbes)](https://pan.baidu.com/s/1HlR0VcHi7bh_FlrjqUH_ig?pwd=dbes)
[Huang1111(OneDrive)](https://drive.google.com/file/d/1mo_6t46G88srRI6U7xM3E_x6QDWZ4LSY/view?usp=sharing)

