
const shortId = require('short-id')

const capsRE = /([A-Z])/g
const hyphenate = (ch) => '-' + ch.toLowerCase()

let sheetNode

module.exports = function ruley(style) {
  return new Ruley(typeof style == 'string' ? style : formatStyle(style))
}

function Ruley(cssText) {
  this.id = '.' + shortId()
  this.style = createRule(this.id, cssText).style
}

Ruley.prototype.set = function(selector, style) {
  const cssText = typeof style == 'string' ? style : formatStyle(style)
  if (!this.nested) this.nested = {}
  const id = this.id + ' ' + selector
  const rule = this.nested[id]
  if (rule) {
    rule.style.cssText = cssText
  } else {
    this.nested[id] = createRule(id, cssText)
  }
  return this
}

Ruley.prototype.apply = function(node) {
  node.classList.add(this.id)
}

Ruley.prototype.peel = function(node) {
  node.classList.remove(this.id)
}

//
// Internal
//

function getSheet() {
  if (!sheetNode) {
    sheetNode = document.createElement('style')
    sheetNode.type = 'text/css'
    document.head.appendChild(sheetNode)
  }
  return sheet.sheet
}

function createRule(id, cssText) {
  const sheet = getSheet()
  const rules = sheet.cssRules
  const index = sheet.insertRule(`${id} {${cssText}}`, rules.length)
  return rules[index]
}

function formatStyle(style) {
  const text = ['\n']
  for (let key in style) {
    const value = style[key]
    if (value != null) {
      text.push(key.replace(capsRE, hyphenate), ': ', String(value), ';\n')
    }
  }
  return text.join('')
}
