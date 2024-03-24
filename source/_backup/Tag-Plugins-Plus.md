---
title: 标签外挂测试
date: 2022-12-03 06:18:18
updated: 2024-02-02 18:33:24
categories:
  - 科学与技术
  - 计算机
  - 网站搭建
tags: 网站搭建
cover: https://s2.hdslb.com/bfs/article/e4bb9f697983d94cd838ee6fda074c23b489052e.png@1e_1c.webp
description: 包括额外安装的标签外挂
abbrlink: 533f6a6
---

# 额外安装的标签外挂

## Tag Plugins Plus [^5]

[^5]: 来自 <https://akilar.top/posts/615e2dec/>

### 行内文本样式 text

1. 带 {% u 下划线 %} 的文本
2. 带 {% emp 着重号 %} 的文本
3. 带 {% wavy 波浪线 %} 的文本
4. 带 {% del 删除线 %} 的文本
5. 键盘样式的文本 {% kbd command %} + {% kbd D %}
6. 密码样式的文本：{% psw 这里没有验证码 %}

### 行内文本 span

- 彩色文字
  在一段话中方便插入各种颜色的标签，包括：{% span red, 红色 %}、{% span yellow, 黄色 %}、{% span green, 绿色 %}、{% span cyan, 青色 %}、{% span blue, 蓝色 %}、{% span gray, 灰色 %}。
- 超大号文字
  文档「开始」页面中的标题部分就是超大号文字。
  {% span center logo large, Volantis %}
  {% span center small, A Wonderful Theme for Hexo %}

### 段落文本 p

- 彩色文字
  在一段话中方便插入各种颜色的标签，包括：{% p red, 红色 %}、{% p yellow, 黄色 %}、{% p green, 绿色 %}、{% p cyan, 青色 %}、{% p blue, 蓝色 %}、{% p gray, 灰色 %}。
- 超大号文字
  文档「开始」页面中的标题部分就是超大号文字。
  {% p center logo large, Volantis %}
  {% p center small, A Wonderful Theme for Hexo %}

### 上标标签 tip

{% tip %}default{% endtip %}
{% tip info %}info{% endtip %}
{% tip success %}success{% endtip %}
{% tip error %}error{% endtip %}
{% tip warning %}warning{% endtip %}
{% tip bolt %}bolt{% endtip %}
{% tip ban %}ban{% endtip %}
{% tip home %}home{% endtip %}
{% tip sync %}sync{% endtip %}
{% tip cogs %}cogs{% endtip %}
{% tip key %}key{% endtip %}
{% tip bell %}bell{% endtip %}
{% tip fa-atom %}自定义 font awesome 图标{% endtip %}

### 引用 note

{% note info %}
已取代
{% endnote %}

### 动态标签 anima

#### On DOM load

{% tip warning faa-horizontal animated %}warning{% endtip %}
{% tip ban faa-flash animated %}ban{% endtip %}

#### 调整动画速度

{% tip warning faa-horizontal animated faa-fast %}warning{% endtip %}
{% tip ban faa-flash animated faa-slow %}ban{% endtip %}

#### On hover（当鼠标悬停时显示动画）

{% tip warning faa-horizontal animated-hover %}warning{% endtip %}
{% tip ban faa-flash animated-hover %}ban{% endtip %}

#### On parent hover（当鼠标悬停在父级元素时显示动画）

{% tip warning faa-parent animated-hover %}<p class="faa-horizontal">warning</p>{% endtip %}
{% tip ban faa-parent animated-hover %}<p class="faa-flash">ban</p>{% endtip %}

### 复选列表 checkbox

{% checkbox 纯文本测试 %}
{% checkbox checked, 支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% checkbox red, 支持自定义颜色 %}
{% checkbox green checked, 绿色 + 默认选中 %}
{% checkbox yellow checked, 黄色 + 默认选中 %}
{% checkbox cyan checked, 青色 + 默认选中 %}
{% checkbox blue checked, 蓝色 + 默认选中 %}
{% checkbox plus green checked, 增加 %}
{% checkbox minus yellow checked, 减少 %}
{% checkbox times red checked, 叉 %}

### 单选列表 radio

{% radio 纯文本测试 %}
{% radio checked, 支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% radio red, 支持自定义颜色 %}
{% radio green, 绿色 %}
{% radio yellow, 黄色 %}
{% radio cyan, 青色 %}
{% radio blue, 蓝色 %}

### 链接卡片 link

{% link 文章效果与字体编码测试, http://lynx3.netlify.app/article/a36a68fc/, https://img.picgo.net/2023/01/27/avatard3d5e890a0ef78a5.webp %}

### 按钮 btns

[Tag Plugins Plus 有关不稳定标签的测试](/article/483eced7/)

### github 卡片 ghcard

#### 用户信息卡片

| {% ghcard LynxCatTheThird %}                | {% ghcard LynxCatTheThird, theme=vue %}             |
| ------------------------------------------- | --------------------------------------------------- |
| {% ghcard LynxCatTheThird, theme=buefy %}   | {% ghcard LynxCatTheThird, theme=solarized-light %} |
| {% ghcard LynxCatTheThird, theme=onedark %} | {% ghcard LynxCatTheThird, theme=solarized-dark %}  |
| {% ghcard LynxCatTheThird, theme=algolia %} | {% ghcard LynxCatTheThird, theme=calm %}            |

#### 仓库信息卡片

| {% ghcard volantis-x/hexo-theme-volantis %}                | {% ghcard volantis-x/hexo-theme-volantis, theme=vue %}             |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| {% ghcard volantis-x/hexo-theme-volantis, theme=buefy %}   | {% ghcard volantis-x/hexo-theme-volantis, theme=solarized-light %} |
| {% ghcard volantis-x/hexo-theme-volantis, theme=onedark %} | {% ghcard volantis-x/hexo-theme-volantis, theme=solarized-dark %}  |
| {% ghcard volantis-x/hexo-theme-volantis, theme=algolia %} | {% ghcard volantis-x/hexo-theme-volantis, theme=calm %}            |

### github 徽标 ghbdage

#### 基本参数,定义徽标左右文字和图标

{% bdage Theme,Butterfly %}
{% bdage Frame,Hexo,hexo %}

#### 信息参数，定义徽标右侧内容背景色，指向链接

{% bdage CDN,JsDelivr,jsDelivr||abcdef,https://metroui.org.ua/index.html,本站使用JsDelivr为静态资源提供CDN加速 %}

> 如果是跨顺序省略可选参数，仍然需要写个逗号,用作分割
> {% bdage Source,GitHub,GitHub||,https://github.com/ %}

#### 拓展参数，支持 shields 的 API 的全部参数内容

{% bdage Hosted,Vercel,Vercel||brightgreen,https://vercel.com/,本站采用双线部署，默认线路托管于Vercel||style=social&logoWidth=20 %}

> 如果是跨顺序省略可选参数组，仍然需要写双竖线||用作分割
> {% bdage Hosted,Vercel,Vercel||||style=social&logoWidth=20&logoColor=violet %}

### 网站卡片 sites

{% sitegroup %}
{% site baidu, url=https://www.baidu.com/, screenshot=https://s2.hdslb.com/bfs/article/342dd0c53a2e1b46e03e11f528d76cfa304557fa.png@1e_1c.webp, avatar=https://www.baidu.com/img/flexible/logo/pc/result.png, description=国内搜索巨头 %}
{% site baidu, url=https://www.baidu.com/, screenshot=https://s2.hdslb.com/bfs/article/342dd0c53a2e1b46e03e11f528d76cfa304557fa.png@1e_1c.webp, avatar=https://www.baidu.com/img/flexible/logo/pc/result.png, description=国内搜索巨头 %}
{% site baidu, url=https://www.baidu.com/, screenshot=https://s2.hdslb.com/bfs/article/342dd0c53a2e1b46e03e11f528d76cfa304557fa.png@1e_1c.webp, avatar=https://www.baidu.com/img/flexible/logo/pc/result.png, description=国内搜索巨头 %}
{% site baidu, url=https://www.baidu.com/, screenshot=https://s2.hdslb.com/bfs/article/342dd0c53a2e1b46e03e11f528d76cfa304557fa.png@1e_1c.webp, avatar=https://www.baidu.com/img/flexible/logo/pc/result.png, description=国内搜索巨头 %}
{% endsitegroup %}

### 行内图片 inlineimage

{% note info %}
已移除
{% endnote %}

### 单张图片 image

{% note info %}
已移除
{% endnote %}

### 音频 audio

{% audio https://ghproxy.net/https://raw.githubusercontent.com/LynxCatTheThird/static-file/main/media/nggy.m4a %}

### 视频 video

#### 100%宽度

{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}

<h4 id="50-宽度">50% 宽度</h4>

{% videos, 2 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% endvideos %}

#### 25%宽度

{% videos, 4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% video https://vdse.bdstatic.com/192d9a98d782d9c74c96f09db9378d93.mp4 %}
{% endvideos %}

### 相册 gallery

{% note info %}
已取代
{% endnote %}

### 折叠框 folding

{% folding 查看图片测试 %}

![](https://s2.hdslb.com/bfs/article/e4bb9f697983d94cd838ee6fda074c23b489052e.png@1e_1c.webp)

{% endfolding %}

{% folding cyan open, 查看默认打开的折叠框 %}

这是一个默认打开的折叠框。

{% endfolding %}

{% folding green, 查看代码测试 %}

```python
print("hello")
```

{% endfolding %}

{% folding yellow, 查看列表测试 %}

- haha
- hehe

{% endfolding %}

{% folding red, 查看嵌套测试 %}

{% folding blue, 查看嵌套测试2 %}

{% folding 查看嵌套测试3 %}

hahaha </span><img src='https://s2.hdslb.com/bfs/article/e4bb9f697983d94cd838ee6fda074c23b489052e.png@1e_1c.webp' style='height:24px'></span>

{% endfolding %}

{% endfolding %}

{% endfolding %}

### 分栏 tab

{% note info %}
已取代
{% endnote %}

### 数据集合 issues

#### 时间轴标签 timeline

{% issues timeline | api=https://api.github.com/repos/TG-Twilight/AWAvenue-Ads-Rule/issues?sort=updated&state=open&page=1&per_page=100 %}

#### 网站卡片标签 sites

{% issues sites | api=https://api.github.com/repos/volantis-x/examples/issues?sort=updated&state=open&page=1&per_page=100 %}

#### 网站卡片标签 sites

{% issues sites | api=https://api.github.com/repos/volantis-x/examples/issues?sort=updated&state=open&page=1&per_page=100 | group=version:版本：^4.0,版本：^3.0,版本：^2.0 %}

### 诗词标签 poem

{% note info %}
已移除
{% endnote %}

### 阿里图标 icon

{% note info %}
已移除
{% endnote %}

### 特效标签 wow

{% wow animate__flip %}
{% note green 'fas fa-fan' modern%}
`flip`动画效果。
{% endnote %}
{% endwow %}

{% wow animate__zoomIn,5s,5s,100,10 %}
{% note blue 'fas fa-bullhorn' modern%}
`zoomIn`动画效果，持续`5s`，延时`5s`，离底部`100`距离时启动，重复`10`次
{% endnote %}
{% endwow %}

{% wow animate__slideInRight,5s,5s %}
{% note orange 'fas fa-car' modern%}
`slideInRight`动画效果，持续`5s`，延时`5s`。
{% endnote %}
{% endwow %}

{% wow animate__heartBeat,,5s,,10 %}
{% note red 'fas fa-battery-half' modern%}
`heartBeat`动画效果，延时`5s`，重复`10`次。
{% endnote %}
{% endwow %}

### 进度条 progress

{% progress 10 red 进度条样式预览 %}
{% progress 30 yellow 进度条样式预览 %}
{% progress 50 green 进度条样式预览 %}
{% progress 70 cyan 进度条样式预览 %}
{% progress 90 blue 进度条样式预览 %}
{% progress 100 gray 进度条样式预览 %}

### 气泡注释 bubble

最近我学到了不少新玩意儿（虽然对很多大佬来说这些已经是旧技术了），比如 CSS 的{% bubble 兄弟相邻选择器,"例如 h1 + p {margin-top:50px;}" %}，{% bubble flex布局,"Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性","#ec5830" %}，{% bubble transform变换,"transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。","#1db675" %}，animation 的{% bubble 贝塞尔速度曲线,"贝塞尔曲线(Bézier curve)，又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。一般的矢量图形软件通过它来精确画出曲线，贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋","#de4489" %}写法，还有今天刚看到的{% bubble clip-path,"clip-path属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。","#868fd7" %}属性。这些对我来说很新颖的概念狠狠的冲击着我以前积累起来的设计思路。

### 引用文献 reference

Akilar の糖果屋(akilar.top)是一个私人性质的博客{% referto '[1]','Akilarの糖果屋群聊简介' %}，从各类教程至生活点滴，无话不谈。建群的目的是提供一个闲聊的场所。博客采用 Hexo 框架{% referto '[2]','Hexo中文文档' %}，Butterfly 主题{% referto '[3]','Butterfly 安装文档(一) 快速开始' %}

本项目参考了 Volantis{% referto '[4]','hexo-theme-volantis 标签插件' %}的标签样式。引入`[tag].js`，并针对`butterfly`主题修改了相应的`[tag].styl`。在此鸣谢`Volantis`主题众开发者。
主要参考内容包括各个 volantis 的内置标签插件文档{% referto '[5]','Volantis文档:内置标签插件' %}
Butterfly 主题的各个衍生魔改{% referto '[6]','Butterfly 安装文档:标签外挂（Tag Plugins' %}{% referto '[7]','小弋の生活馆全样式预览' %}{% referto '[8]','l-lin-font-awesome-animation' %}{% referto '[9]','小康的butterfly主题使用文档' %}

{% referfrom '[1]','Akilarの糖果屋群聊简介','https://jq.qq.com/?_wv=1027&k=pGLB2C0N' %}
{% referfrom '[2]','Hexo中文文档','https://hexo.io/zh-cn/docs/' %}
{% referfrom '[3]','Butterfly 安装文档(一) 快速开始','https://butterfly.js.org/posts/21cfbf15/' %}
{% referfrom '[4]','hexo-theme-volantis 标签插件','https://volantis.js.org/v5/tag-plugins/' %}
{% referfrom '[5]','Volantis文档:内置标签插件','https://volantis.js.org/tag-plugins/' %}
{% referfrom '[6]','Butterfly 安装文档:标签外挂（Tag Plugins','https://butterfly.js.org/posts/4aa8abbe/#%E6%A8%99%E7%B1%A4%E5%A4%96%E6%8E%9B%EF%BC%88Tag-Plugins%EF%BC%89' %}
{% referfrom '[7]','小弋の生活馆全样式预览','https://lovelijunyi.gitee.io/posts/c898.html' %}
{% referfrom '[8]','l-lin-font-awesome-animation','https://github.com/l-lin/font-awesome-animation' %}
{% referfrom '[9]','小康的butterfly主题使用文档','https://www.antmoe.com/posts/3b43914f/' %}
