const MarkdownIt = require("markdown-it");

const { katex } = require("@mdit/plugin-katex");
const markdownItAnchor = require("markdown-it-anchor");

const { mhchem = false, ...katexOptions } = hexo.config.markdown?.katex || {};
if (mhchem) require("@mdit/plugin-katex/mhchem");

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  typographer: true,
});

for (const name of ["abbr", "dl", "footnote", "ins", "mark", "sub", "sup", "tasklist", "spoiler"]) {
  md.use(require(`@mdit/plugin-${name}`)[name]);
}

md.use(katex, katexOptions)
  .use(markdownItAnchor, {
    level: 1,
    permalink: false,
  });

const markdownRenderer = (data) => md.render(data.text);
hexo.extend.renderer.register("md", "html", markdownRenderer, true);
hexo.extend.renderer.register("markdown", "html", markdownRenderer, true);
