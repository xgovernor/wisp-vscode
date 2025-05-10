# Wisp VS Code Extension

This extension provides modern language support for the Wisp programming language, which features English-like, production-ready syntax.

## Features

- Syntax highlighting for `.wisp` files, including:
  - English-like keywords (`show`, `ask`, `constant`, `structure`, etc.)
  - Type declarations (e.g., `32 bit number`, `character string`)
  - String interpolation with `{var}` inside backticks
  - Both `#` and `//` comments
- Snippets for common Wisp constructs:
  - Variable/constant declarations
  - `show`, `ask`, `if...else`, loops, arrays, objects, file I/O, functions, error handling, concurrency
- Bracket/parenthesis matching and auto-closing
- Comment toggling

## Getting Started

1. Install this extension in VS Code.
2. Open or create a `.wisp` file to activate language features.

## Syntax Highlighting

The extension uses a TextMate grammar for highlighting:

- English-like keywords and operators
- Type declarations (e.g., `32 bit number`, `character string`)
- String interpolation in backtick strings
- Comments (`#` and `//`)
- Numbers, constants, and identifiers

## Linter

Type `pnpm run lint` to check your `.wisp` files for syntax errors and style issues.
The linter logic is now located in `src/linter.js` for both CLI and real-time diagnostics.

## Snippets

Type prefixes like `let`, `constant`, `show`, `if`, `while`, `for`, `do`, `ask`, `array`, `object`, `read_file`, `write_file`, `function`, `try`, `async`, or `spawn` for code templates.

## Language Configuration

- Line comments: `#`, `//`
- Brackets: `{ }`, `[ ]`, `( )`
- Auto-closing pairs for quotes, brackets, and braces

## Contributing

See the main Wisp repository for language details and contribution guidelines.

## License

MIT
