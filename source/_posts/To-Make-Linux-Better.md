---
title: To Make Linux Better!
date: 2024-07-24 17:32:40
updated: 2024-07-24 17:32:40
categories:
  - 科学与技术
  - 计算机
  - Linux
tags:
  - Linux
  - Bug
cover: https://s2.hdslb.com/bfs/article/60bd9ceb33e924c1ac72dd757c2fb8201352440272.png
description: Linux 的备忘录，记录 Linux 相关的一些问题和解决方案。
abbrlink: b5186965
---

# 出发点

1. 部分软件未针对 Arch Linux 进行适配，导致出现兼容性问题。
2. 部分软件的默认配置不尽合理，或与每个人的情况不符，需要进行调整。
3. 系统的部分行为不够合理，需要进行调整。

# Alsa 的配置与兼容

[Alsa](https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture) 是 Linux 声卡驱动程序，通常是 Linux 默认的声卡驱动程序。

ArchLinux 的 Alsa 包 似乎没有附带默认配置文件，因此难免遇到问题，此处以我自己用到的 ClassIn 为例。

## 除去软件自带的错误的库

由于 ClassIn 自带一部分 Alsa 库，导致 Alsa 无法正常工作，ClassIn 成了聋哑软件。

```apache
ALSA lib dlmisc.c:170:(snd_dlsym_verify) unable to verify version for symbol snd_func_private_integer
ALSA lib conf.c:4556:(_snd_config_evaluate) symbol snd_func_private_integer is not defined inside (null)
ALSA lib conf.c:5047:(snd_config_expand) Evaluate error: 没有那个设备或地址
ALSA lib conf.c:3694:(snd_config_hook_load) Unable to expand filenames in the pre-load section
ALSA lib conf.c:3572:(snd_config_hooks_call) function snd_config_hook_load_for_all_cards returned error: 没有那个设备或地址
ALSA lib control.c:1264:(snd_ctl_open_conf) Invalid type for CTL default definition
```

直接删除即可：

```bash
rm -rf /opt/apps/classin/lib/libasound.so*
```

## 调整配置文件

### 指定设备

再次运行 ClassIn，仍然报错，并且找不到扬声器/耳机，只找到麦克风：

```apache
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
ALSA lib pcm_dmix.c:1000:(snd_pcm_dmix_open) unable to open slave
```

看起来是没找到设备，指定下就好了。

先找一下设备：

```bash
aplay -l
```

输出类似如下内容：

```apache
**** List of PLAYBACK Hardware Devices ****
card 1: PCH [HDA Intel PCH], device 0: ALC897 Analog [ALC897 Analog]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: PCH [HDA Intel PCH], device 1: ALC897 Digital [ALC897 Digital]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 2: HDMI [HDA ATI HDMI], device 3: HDMI 0 [HDMI 0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

发现有两个 Card，分别是 `PCH` 和 `HDMI`，其中 `PCH` 卡有两个 Device，分别是 `ALC897 Analog` 和 `ALC897 Digital`，`HDMI` 卡有一个 Device `HDMI 0`。

编辑 `/etc/asound.conf` 文件，指定声卡。这里我添加如下内容：

```
pcm.!default {
    type hw
    card 1
    device 0
}

ctl.!default {
    type hw
    card 1
}
```

当然，也可以用设备名称来指定。

核实下设备名：

```bash
aplay -l | awk -F \: '/,/{print $2}' | awk '{print $1}' | uniq
```

输出如下内容：

```
PCH
HDMI
```

改写配置文件：

```
pcm.!default {
    type hw
    card PCH
    device 0
}

ctl.!default {
    type hw
    card PCH
}
```

这样就指定了默认的声卡为 `PCH`。

### 调节声道

再次运行 ClassIn，仍然报错，而且更糟糕的是输入输出都没有声音——又成聋哑软件了：

```apache
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for PLAYBACK: 无效的参数
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for CAPTURE: 无效的参数
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for PLAYBACK: 无效的参数
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for PLAYBACK: 无效的参数
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for PLAYBACK: 无效的参数
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for PLAYBACK: 无效的参数
ALSA lib pcm.c:8832:(snd_pcm_set_params) Channels count (1) not available for PLAYBACK: 无效的参数
```

声道不太对，调整下配置文件：

```
pcm.!default {
    type plug
    slave.pcm "hw:1,0"
}

ctl.!default {
    type hw
    card 1
}
```

这将使用 `plug` 插件自动转换音频参数以匹配设备的支持范围。

再次运行 ClassIn，声音设备正常了。

### 后记

还有许多可以修改的，比如解决 Alsa 与 PulseAudio 的冲突，日后再补充……

# FontConfig 的美化

[FontConfig](https://wiki.archlinux.org/title/Font_configuration) 是 Linux 字体管理器，负责管理系统中字体文件的搜索路径、渲染方式、字体匹配规则等。

FontConfig 默认配置对 CJK + 编程的应用场景来说并不友好，会遇到以下问题：

1. CJK 字形错乱，简体中文、繁体中文、日文、韩文等字形混用
2. 字体渲染效果不佳，缺少粗体、斜体等效果
3. 终端设置等宽字体会导致 CJK 字符回退到宋体，设置 CJK 字体会导致等宽字体的错乱
4. 缺失 Windows 下常用的字体（微软雅黑、黑体、宋体、Arial、Times New Roman、Courier New 等）导致显示效果不佳
5. 默认的 `Sans`、`Serif`、`Monospace` 等字体不够美观，并且功能欠缺
6. ZSH 的符号字体显示效果不佳

## 懒人篇

### 安装字体

```bash
sudo paru -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra ttf-font-awesome ttf-nerd-fonts-symbols ttf-th-tshyn ttf-jetbrains-mono
```

### 调整配置文件

编辑 `~/.config/fontconfig/fonts.conf` 文件，添加以下内容：

```xml
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'urn:fontconfig:fonts.dtd'>
<fontconfig>
    <!-- 拓宽系统字体设置生效面 -->
    <match target="pattern">
        <test name="family">
            <string>system-ui</string>
        </test>
        <edit binding="strong" mode="prepend" name="family">
            <string>sans-serif</string>
        </edit>
    </match>
    <match target="pattern">
        <test name="family" qual="any">
            <string>ui-monospace</string>
        </test>
        <edit binding="same" mode="assign" name="family">
            <string>monospace</string>
        </edit>
    </match>
    <match target="pattern">
        <test name="family" qual="any">
            <string>ui-sans-serif</string>
        </test>
        <edit binding="same" mode="assign" name="family">
            <string>sans-serif</string>
        </edit>
    </match>
    <match target="pattern">
        <test name="family" qual="any">
            <string>ui-serif</string>
        </test>
        <edit binding="same" mode="assign" name="family">
            <string>serif</string>
        </edit>
    </match>
    <!-- 你可以自行添加更多字体设置 -->

    <!-- 字体替换  -->
    <match target="pattern">
        <test compare="contains" name="family">
            <string>宋体</string>
        </test>
        <edit binding="strong" name="family">
            <string>serif</string>
        </edit>
    </match>
    <match target="pattern">
        <test compare="contains" name="family">
            <string>Microsoft YaHei</string>
        </test>
        <edit binding="strong" name="family">
            <string>sans-serif</string>
        </edit>
    </match>
    <match target="pattern">
        <test compare="contains" name="family">
            <string>微软雅黑</string>
        </test>
        <edit binding="strong" name="family">
            <string>sans-serif</string>
        </edit>
    </match>
    <match target="pattern">
        <test compare="contains" name="family">
            <string>Arial</string>
        </test>
        <edit binding="strong" name="family">
            <string>sans-serif</string>
        </edit>
    </match>
    <match target="pattern">
        <test compare="contains" name="family">
            <string>Source Code Pro</string>
        </test>
        <edit binding="strong" name="family">
            <string>monospace</string>
        </edit>
    </match>
    <!-- 你可以自行补充更多字体替换 -->

    <!-- 等宽字体顺序 -->
    <match target="pattern">
        <test name="family" qual="any">
            <string>monospace</string>
        </test>
        <edit binding="strong" mode="prepend" name="family">
            <string>JetBrains Mono</string>
            <string>Noto Sans Mono CJK SC</string>
            <string>Noto Color Emoji</string>
            <string>Symbols Nerd Font</string>
            <string>Font Awesome 6 Free</string>
        </edit>
    </match>

    <!-- 无衬线字体顺序 -->
    <match target="pattern">
        <test name="family" qual="any">
            <string>sans-serif</string>
        </test>
        <edit binding="strong" mode="prepend" name="family">
            <string>Noto Sans CJK SC</string>
            <string>Noto Color Emoji</string>
            <string>Symbols Nerd Font</string>
            <string>Font Awesome 6 Free</string>
        </edit>
    </match>

    <!-- 衬线字体顺序 -->
    <match target="pattern">
        <test name="family" qual="any">
            <string>serif</string>
        </test>
        <edit binding="strong" mode="prepend" name="family">
            <string>Noto Serif CJK SC</string>
            <string>Noto Color Emoji</string>
            <string>Symbols Nerd Font</string>
            <string>Font Awesome 6 Free</string>
        </edit>
    </match>

    <!-- 渲染设置 -->
    <match target="font">
        <test name="slant">
            <const>roman</const>
        </test>
        <test compare="not_eq" name="slant" target="pattern">
            <const>roman</const>
        </test>
        <edit mode="assign" name="matrix">
            <times>
                <name>matrix</name>
                <matrix>
                    <double>1</double>
                    <double>0.2</double>
                    <double>0</double>
                    <double>1</double>
                </matrix>
            </times>
        </edit>
        <edit mode="assign" name="slant">
            <const>oblique</const>
        </edit>
        <edit mode="assign" name="embeddedbitmap">
            <bool>false</bool>
        </edit>
    </match>
    <match target="font">
        <test compare="less_eq" name="weight">
            <const>medium</const>
        </test>
        <test compare="more_eq" name="weight" target="pattern">
            <const>bold</const>
        </test>
        <edit mode="assign" name="embolden">
            <bool>true</bool>
        </edit>
        <edit mode="assign" name="weight">
            <const>bold</const>
        </edit>
    </match>

    <dir>~/.fonts</dir>
</fontconfig>
```

## 解释

### 字体家族

字体家族（family）是指一组字体，通常包括一个默认字体和一组备用字体。

在 FontConfig 中，字体家族的设置通过 `family` 选项来实现。这里以 `serif`（有衬线字体）字体家族为例，设置字体家族的优先级：

```xml
<match target="pattern">
    <test name="family" qual="any">
        <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
        <string>Noto Serif CJK SC</string>
        <string>Noto Color Emoji</string>
        <string>Symbols Nerd Font</string>
        <string>Font Awesome 6 Free</string>
    </edit>
</match>
```
字体家族的优先级由上到下，越靠前的字体优先级越高。建议按照以下优先级设置字体家族：

1. 中文字体
2. 英文字体
3. 表情符号
4. Icon 字体

设置字体家族后，系统会自动按照优先级匹配字体，从而有效解决问题3、5、6。如果锁死使用某一字形，还可以粗暴但有效地解决问题1。此外，若字体有多字重，搭配渲染设置可以解决问题2。

### 字体替换

比如上面覆盖 `宋体` 字体与`system-ui` 字体家族的配置，以解决问题4。

### 渲染策略

直接使用默认配置就好了，有问题再二分法排查。啥？你没备份？我这有一份完全的默认的配置，注释都没删，罚你自己整理！

```xml
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'urn:fontconfig:fonts.dtd'>
<fontconfig>
 <!-- 
 Artificial oblique for fonts without an italic or oblique version
 -->
 <match target="font">
  <!-- check to see if the font is roman -->
  <test name="slant">
   <const>roman</const>
  </test>
  <!-- check to see if the pattern requested non-roman -->
  <test compare="not_eq" name="slant" target="pattern">
   <const>roman</const>
  </test>
  <!-- multiply the matrix to slant the font -->
  <edit mode="assign" name="matrix">
   <times>
    <name>matrix</name>
    <matrix>
     <double>1</double>
     <double>0.2</double>
     <double>0</double>
     <double>1</double>
    </matrix>
   </times>
  </edit>
  <!-- pretend the font is oblique now -->
  <edit mode="assign" name="slant">
   <const>oblique</const>
  </edit>
  <!-- and disable embedded bitmaps for artificial oblique -->
  <edit mode="assign" name="embeddedbitmap">
   <bool>false</bool>
  </edit>
 </match>
 <!--
 Synthetic emboldening for fonts that do not have bold face available
 -->
 <match target="font">
  <!-- check to see if the weight in the font is less than medium which possibly need emboldening -->
  <test compare="less_eq" name="weight">
   <const>medium</const>
  </test>
  <!-- check to see if the pattern requests bold -->
  <test compare="more_eq" name="weight" target="pattern">
   <const>bold</const>
  </test>
  <!--
		  set the embolden flag
		  needed for applications using cairo, e.g. gucharmap, gedit, ...
		-->
  <edit mode="assign" name="embolden">
   <bool>true</bool>
  </edit>
  <!--
		 set weight to bold
		 needed for applications using Xft directly, e.g. Firefox, ...
		-->
  <edit mode="assign" name="weight">
   <const>bold</const>
  </edit>
 </match>
 <match target="font">
  <edit mode="assign" name="rgba">
   <const>rgb</const>
  </edit>
 </match>
 <match target="font">
  <edit mode="assign" name="hinting">
   <bool>true</bool>
  </edit>
 </match>
 <match target="font">
  <edit mode="assign" name="hintstyle">
   <const>hintslight</const>
  </edit>
 </match>
 <dir>~/.fonts</dir>
 <match target="font">
  <edit mode="assign" name="antialias">
   <bool>true</bool>
  </edit>
 </match>
</fontconfig>
```
### 后记

此外，还有一些高级的设置，比如：

- 调整字体大小、粗细
- 根据语言自动调整字体
- 为某一程序调整字体
- 为某一字体调整渲染策略
- 根据应用场景自动调整渲染策略

这些设置可以根据个人喜好进行调整。我对此没有需求，未做过研究，请参阅以下资料：

- [Arch Wiki: Font Configuration](https://wiki.archlinux.org/title/Font_configuration)
- [FontConfig User Documentation](https://fontconfig.pages.freedesktop.org/fontconfig/fontconfig-user.html)
- [用 fontconfig 治理 Linux 中的字体 – 双猫CC](https://catcat.cc/post/2021-03-07/)
- [Bryan2333/Dotfiles](https://github.com/Bryan2333/Dotfiles/blob/master/.config/fontconfig/fonts.conf)
