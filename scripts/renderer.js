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
const markdownItAnchor = require("markdown-it-anchor");

// 注入化学宏包
require("@mdit/plugin-katex/mhchem");

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  typographer: true,
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
  .use(katex)
  .use(markdownItAnchor, {
    level: 1,
    permalink: false,
  });

// ECharts 代码围栏渲染 (使用 before_post_render 过滤器避开 hexo 默认的高亮过滤器)
let echartsCounter = 0;
const defaultEchartsCdn = "https://registry.npmmirror.com/echarts/6.0.0/files/dist/echarts.min.js";
const echartsCdn = (hexo.config.echarts && hexo.config.echarts.cdn) || defaultEchartsCdn;

hexo.extend.injector.register(
  "head_end",
  `<style>.echarts-container canvas{animation:none!important}</style><script src="${echartsCdn}"></script>`,
  "post",
);

function escapeHtml(data) {
  return JSON.stringify(data)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

hexo.extend.filter.register("before_post_render", function (data) {
  const reg = /```echarts\s*\n([\s\S]*?)\n```/g;

  data.content = data.content.replace(reg, function (match, content) {
    const id = `echarts-${Date.now()}-${echartsCounter++}`;
    const optionJson = content.trim();
    let option;

    try {
      option = JSON.parse(optionJson);
    } catch (error) {
      hexo.log.warn(`echarts block in ${data.source || data.path || "post"} is not valid JSON: ${error.message}`);
      return match;
    }

    option.animation = false;

    return (
      `<div id="${id}" class="echarts-container" style="width:100%;height:400px;margin:1em 0;"></div>\n` +
      `<textarea hidden id="${id}-option">${escapeHtml(option)}</textarea>\n` +
      `<script data-pjax>\n` +
      `(function(){\n` +
      `  var resizeHandler;\n` +
      `  var initEchart = function() {\n` +
      `    if (typeof echarts === "undefined") return;\n` +
      `    var el = document.getElementById("${id}");\n` +
      `    if (!el) return;\n` +
      `    var optionEl = document.getElementById("${id}-option");\n` +
      `    if (!optionEl) return;\n` +
      `    var isDark = document.documentElement.getAttribute("data-theme") === "dark";\n` +
      `    var themeName = isDark ? "dark" : "light";\n` +
      `    if (el.__echartsInstance && el.__echartsTheme === themeName) {\n` +
      `      el.__echartsInstance.resize();\n` +
      `      return;\n` +
      `    }\n` +
      `    if (resizeHandler) window.removeEventListener("resize", resizeHandler);\n` +
      `    if (el.__echartsInstance) {\n` +
      `      el.__echartsInstance.dispose();\n` +
      `      el.__echartsInstance = null;\n` +
      `    }\n` +
      `    var chart = echarts.init(el, isDark ? "dark" : null);\n` +
      `    el.__echartsInstance = chart;\n` +
      `    el.__echartsTheme = themeName;\n` +
      `    chart.setOption(JSON.parse(optionEl.textContent));\n` +
      `    resizeHandler = function() { chart.resize(); };\n` +
      `    window.addEventListener("resize", resizeHandler);\n` +
      `  };\n` +
      `  if (window.btf && typeof btf.addGlobalFn === "function") {\n` +
      `    btf.addGlobalFn("themeChange", initEchart, "${id}");\n` +
      `  }\n` +
      `  initEchart();\n` +
      `})();\n` +
      `</script>\n`
    );
  });
  return data;
}, 9);

// 注册为 Hexo 渲染引擎
hexo.extend.renderer.register(
  "md",
  "html",
  function (data, options) {
    return md.render(data.text);
  },
  true,
);
