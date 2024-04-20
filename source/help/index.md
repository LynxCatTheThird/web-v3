---
title: 问题自查
date: 2024-01-30 20:57:53
---

# 主站访问不了

请尝试以下镜像站：

|     部署平台     | 源地址                               | 自定义域名              | 备用 1                    | 备用 2                               |
| :--------------: | :----------------------------------- | :---------------------- | :------------------------ | :----------------------------------- |
|      Github      | <https://lynxcatthethird.github.io/> | 暂无                    | 暂无                      | 暂无                                 |
|     Netlify      | <https://lynx3.netlify.app/>         | <https://nl.lynx3.top/> | <https://nl.lctt.eu.org/> | <https://nl.lynxcatthethird.eu.org/> |
|      Vercel      | <https://lynx3.vercel.app/>          | <https://vc.lynx3.top/> | <https://vc.lctt.eu.org/> | <https://vc.lynxcatthethird.eu.org/> |
| Cloudflare Pages | <https://lynx3.pages.dev/>           | <https://cf.lynx3.top/> | <https://cf.lctt.eu.org/> | <https://cf.lynxcatthethird.eu.org/> |

重要信息：以下链接均已停用，全部重定向至其它可用链接：

| 链接                                            |                                    重定向方式                                     |
| :---------------------------------------------- | :-------------------------------------------------------------------------------: |
| <https://lynxcatthethird-person.netlify.app/>   | `<meta http-equiv="refresh" content="0;url=https://lynxcatthethird.github.io/"> ` |
| <https://lynxcatthethird-person-2.netlify.app/> | `<meta http-equiv="refresh" content="0;url=https://lynxcatthethird.github.io/"> ` |
| <https://lynxcatthethird-person.vercel.app/>    |                     301 重定向至 <https://lynx3.vercel.app/>                      |
| <https://lynxcatthethird-person.pages.dev/>     | `<meta http-equiv="refresh" content="0;url=https://lynxcatthethird.github.io/"> ` |

# 某些功能失常

当您遇到某些功能无法使用时，请首先检查广告屏蔽插件的嫌疑。您可以尝试使用浏览器的隐私模式再做尝试。

若您排除了插件的可能性，请检查代理配置：使用代理的请断开代理，并确定网络已经完全恢复至无代理的状态；未使用代理的请尝试代理，并确定相关请求走代理。

## Twikoo

### 加载

加载成功后您会在输入框中看到一段提示语。

除了部分特殊地区外，Twikoo 一般不会出问题。若不能使用，请访问 [ITDog](https://www.itdog.cn/http/) 或 [Twikoo 后端](https://twikoo-vercel.lynx3.top/) 查看有无问题。

## Waline

Waline 不稳定，仅作为备用评论。若不能使用，请访问 [ITDog](https://www.itdog.cn/http/) 或 [Waline 后端](https://waline-vercel.lynx3.top/) 查看有无问题。

# 全站可以访问但异常

1. 检查浏览器
   1. 不使用 IE 浏览器和命令行浏览器，检查浏览器是否启用了 IE 模式。本站不对 IE 和命令行浏览器提供任何兼容。
   2. 检查浏览器版本。本站仅对浏览器内核（包括 Chromium 或 Gecko）版本号高于 100 的浏览器提供完整支持。
   3. 若您使用水狐、Brave、Opera 等高度魔改的浏览器，或 Ungoogled-Chromium、Chromium 等精简版、开发版浏览器，请尝试 Chrome、Edge 等主流浏览器。
2. 检查 ServiceWorker 注册情况：打开开发者工具，查看控制台中是否有以下信息之一。若有，打开浏览器的开发者工具，来到“应用”，找到“ServiceWorker”小项，点击右侧的“取消注册”。来到存储，将除“模拟自定义空间配额”之外的对勾全部点亮，点击清除网站数据。刷新页面后，ServiceWorker 应当自动安装好。
   - Service Worker 注册失败，可能是由于您的浏览器不支持该功能！
   - 加载 update.json 时遇到异常，状态码：404
   - 缓存匹配出错
   - 反复刷新仍无法解决的“未找到缓存”

# 部分页面表现异常

1. 检查 ServiceWorker 注册情况：打开浏览器的开发者工具，来到“应用”，找到“ServiceWorker”小项，点击右侧的“取消注册”。来到存储，将除“模拟自定义空间配额”之外的对勾全部点亮，点击清除网站数据。刷新页面后，ServiceWorker 应当自动安装好。
   - Service Worker 注册失败，可能是由于您的浏览器不支持该功能！
   - 加载 update.json 时遇到异常，状态码：404
   - 缓存匹配出错
   - 反复刷新仍无法解决的“未找到缓存”
2. 检查浏览器
   1. 不使用 IE 浏览器和命令行浏览器，检查浏览器是否启用了 IE 模式。本站不对 IE 和命令行浏览器提供兼容。
   2. 检查浏览器版本。本站仅对浏览器内核（包括 Chromium Gecko）版本号高于 100 的浏览器提供完整支持。
   3. 若您使用水狐、Brave、Opera 等高度魔改的浏览器，或 Ungoogled-Chromium、Chromium 等精简版、开发版浏览器，请尝试 Chrome、Edge 等主流浏览器。
3. 检查插件问题（包括浏览器自带的部分功能，如 CatsXP 自带的广告拦截、Brave 提供的隐私功能）。
4. 检查网络问题（有时是因为网络问题阻碍某些资源的加载导致异常）。
