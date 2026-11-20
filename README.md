# LynxCatTheThird 的第三个 Hexo 站点

使用 [Dragonfly](themes/dragonfly/README.md) 主题。主题配置位于 [_config.dragonfly.yml](_config.dragonfly.yml)，Hexo 配置位于 [_config.yml](_config.yml)。

> [!WARNING]
> Dragonfly 的开发高度依赖 AI 编程工具。自动化测试可能遗漏特定配置下的问题。部署或升级前，请备份站点配置，用自己的文章在本地预览，并检查常用功能。

```sh
git submodule update --init --recursive
npm install
npm run build
```

安装命令会同时安装主题生产依赖。主题开发、配置与迁移说明见主题目录的文档；站点自身许可见 [LICENSE](LICENSE)，主题许可和来源见主题的 [LICENSE](themes/dragonfly/LICENSE) 与 [NOTICE](themes/dragonfly/NOTICE)。

预览：<https://web-v3-tester.vercel.app/>
