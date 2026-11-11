const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { createRequire } = require('node:module')

test('KaTeX chemistry is optional and renders at build time with other Markdown plugins', () => {
  const file = path.resolve(__dirname, '../scripts/renderer.js')
  const source = fs.readFileSync(file, 'utf8')
  for (const mhchem of [false, true]) {
    const renderers = {}
    const hexo = {
      config: { markdown: { katex: { mhchem, macros: { '\\Probe': '\\mathbf{X}' } } } },
      extend: { renderer: { register: (name, _, render) => { renderers[name] = render } } }
    }
    vm.runInNewContext(source, { hexo, require: createRequire(file) })
    const html = renderers.md({ text: '# Title\n\n$\\ce{H2O}$ and $\\Probe$\n\n==mark== ~sub~ ^sup^' })
    assert.equal(html.includes('mathcolor="#cc0000"'), !mhchem)
    assert.ok(html.includes('<annotation encoding="application/x-tex">\\Probe</annotation>'))
    assert.ok(html.includes('id="title"'))
    for (const tag of ['mark', 'sub', 'sup']) assert.ok(html.includes(`<${tag}>`))
    assert.ok(!html.includes('<script'))
    assert.equal(renderers.md, renderers.markdown)
  }
})
