const MarkdownIt = require("markdown-it");

const { abbr } = require("@mdit/plugin-abbr");
const { dl } = require("@mdit/plugin-dl");
const { footnote } = require("@mdit/plugin-footnote");
const { ins } = require("@mdit/plugin-ins");
const { mark } = require("@mdit/plugin-mark");
const { sub } = require("@mdit/plugin-sub");
const { sup } = require("@mdit/plugin-sup");
const { tasklist } = require("@mdit/plugin-tasklist");
const { katex } = require("@mdit/plugin-katex");
const { spoiler } = require("@mdit/plugin-spoiler");

// 注入化学宏包
require("@mdit/plugin-katex/mhchem");

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  typographer: false,
});

md.use(abbr)
  .use(dl)
  .use(footnote)
  .use(ins)
  .use(mark)
  .use(sub)
  .use(sup)
  .use(tasklist)
  .use(spoiler)
  .use(katex);

// 注册为 Hexo 渲染引擎
hexo.extend.renderer.register(
  "md",
  "html",
  function (data, options) {
    return md.render(data.text);
  },
  true,
);
