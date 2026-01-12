# Rspack Bug: "quasic should be not empty" with Unicode Escape Sequences in Template Literals

## Description

Rspack panics with the error `quasic should be not empty` when processing code that contains Unicode escape sequences inside template literals.

The panic occurs at:

```
crates/rspack_plugin_javascript/src/utils/eval/eval_tpl_expr.rs:35:10
```

## Environment

- **Rspack Version**: 1.7.1
- **Node Version**: v22.21.1 (via nvm - see `.nvmrc`)
- **OS**: macOS

## Reproduction Steps

1. Clone this repository
2. Run `npm install` (or `pnpm install`)
3. Run `npm run build:rspack`

You should see the following error:

```
Panic occurred at runtime. Please file an issue on GitHub with the backtrace below: https://github.com/web-infra-dev/rspack/issues: panicked at crates/rspack_plugin_javascript/src/utils/eval/eval_tpl_expr.rs:35:10:
quasic should be not empty
```

## Minimal Test Case

The issue can be reproduced with this single line:

```javascript
const regex = new RegExp(`\uD83C[\uDFFB-\uDFFF]`, 'g');
```

That's it! No interpolation, no array operations - just a Unicode escape sequence inside a template literal.

## Workaround

Use regular string literals instead of template literals:

```javascript
const regex = new RegExp('\\uD83C[\\uDFFB-\\uDFFF]', 'g');
```

Note the double backslashes (`\\u`) when using string literals vs single backslashes (`\u`) in template literals.

## Expected Behavior

Rspack should handle Unicode escape sequences in template literals the same way as:

- Webpack (works correctly)
- Node.js native execution (works correctly)
- All modern JavaScript bundlers

## Actual Behavior

Rspack panics with `quasic should be not empty` error during the build process.

## Real-World Impact

This issue was encountered when upgrading a production application using emoji processing code. The specific use case was building a regex pattern to match emoji characters with optional skin tone modifiers.

Original issue in production: https://github.com/KimonoIM/web/pull/12291

## Additional Context

The error message `quasic should be not empty` suggests an issue with parsing or evaluating quasi expressions in template literals.

It appears rspack's template expression evaluator (`eval_tpl_expr.rs`) doesn't correctly handle Unicode escape sequences when they appear in template literals, even in the simplest case with no interpolation.

## Test with Webpack

To verify this works with webpack:

```bash
npm run build:webpack
```

Webpack successfully builds the same code without errors.
