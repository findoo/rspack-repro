# Issue Title

Panic: "quasic should be not empty" when using Unicode escape sequences in template literals

## Bug Description

Rspack panics with `quasic should be not empty` when processing code containing Unicode escape sequences inside template literals.

## Steps to Reproduce

See the minimal reproducible example at: https://github.com/findoo/rspack-repro

The absolute minimal reproduction is just one line:

```javascript
const regex = new RegExp(`\uD83C[\uDFFB-\uDFFF]`, 'g');
```

No interpolation or complex expressions needed - just a Unicode escape sequence in a template literal.

## Expected Behavior

The code should compile successfully, as it does with:

- Webpack 5.104.1 ✅
- Node.js native execution ✅

## Actual Behavior

Build fails with panic:

```
panicked at crates/rspack_plugin_javascript/src/utils/eval/eval_tpl_expr.rs:35:10:
quasic should be not empty
```

## Environment

- Rspack: 1.7.1
- Node: v22.21.1
- OS: macOS

## Workaround

Use regular string literals instead of template literals:

```javascript
const regex = new RegExp('\\uD83C[\\uDFFB-\\uDFFF]', 'g');
```

Note: double backslashes required for string literals.

## Additional Context

- Encountered in production emoji processing code
- The issue occurs even without any template literal interpolations
- Related to template literal evaluator handling of Unicode escapes

## Minimal Repro Repository

https://github.com/findoo/rspack-repro
