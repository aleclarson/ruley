
# ruley v0.0.1

Dynamic stylesheet.

- Classes are randomly named.
- Nested selectors are supported.

```js
const ruley = require('ruley')

// Create a class-based rule, using a string.
const rule = ruley(`
  padding-top: 1px;
  background: white;
`)

// Or use an object.
const rule = ruley({
  paddingTop: '1px',
  background: 'white',
})

// The base selector.
rule.id

// The `CSSStyleDeclaration` object.
rule.style

// Set a nested rule.
rule.set('> *', {
  margin: '20px',
})

// See what nested rules exist (if any).
rule.nested

// Add our rule to an element (using `classList`).
rule.apply(element)

// Remove our rule from an element.
rule.peel(element)
```

### Roadmap

- `update` method
- `disable/enable` methods
