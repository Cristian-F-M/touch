# @cmorales_/touch

Creating complex file structures has never been easier. `@cmorales_/touch` is a powerful CLI tool that allows you to generate nested directories and files using a simple and intuitive syntax.

## Installation

You can use the package directly via `npx` or install it globally.


### Global Installation (Recommended)

```bash
npm install -g @cmorales_/touch
# or
pnpm add -g @cmorales_/touch
# or
bun add -g @cmorales_/touch
```

### Using `npx`

```bash
npx @cmorales_/touch <structure>
```


## Usage

The basic syntax is:

```bash
touch <input>
```

Where `<input>` describes the file and folder structure you want to create.

### Key Features

#### 1. Creating Directories
To create a directory, simply append a `/` to the name.
- `app/` -> Creates a folder named `app`.
- `app/models/` -> Creates an `app` folder and a `models` folder inside it.

#### 2. Grouping
You can group multiple items at the same level using `{}`, `[]`, or `()`. All work identically and can be used interchangeably.

- **Curly Braces:** `src/{components,utils}`
- **Square Brackets:** `src/[components,utils]`
- **Parentheses:** `src/(components,utils)`

All the above commands create `src/components` and `src/utils`.

#### 3. Nesting
You can nest groups within groups to build complex trees.

```bash
src/{components/{Button,Input},utils}
```
Creates:
- `src/components/Button`
- `src/components/Input`
- `src/utils`

#### 4. Extensions
You can specify extensions in two ways:

- **Per File:** Directly in the name.
  `src/{index.ts,styles.css}`

- **Default Extension:** If you provide an extension at the end of a group, it will be applied to all files in that group that don't already have one.

  `src/{components,utils}.ts`
  Creates:
  - `src/components.ts`
  - `src/utils.ts`

### Examples

**React Component Structure:**
```bash
src/components/Button/{index.tsx,styles.module.css,types.ts}
```

**MVC Backend Structure:**
```bash
src/{controllers/,models/,routes/,services/}
```

**Complex Project Setup:**
```bash
my-app/{src/{components/,hooks/,utils/},public/,package.json,README.md}
```

## About the Author

Created by **Cristian Morales**.

- **GitHub:** [Cristian-F-M](https://github.com/Cristian-F-M)
- **Twitter:** [@Morales_M20](https://x.com/Morales_M20)

## Support

If you find this tool useful, you can support my work!

<a href="https://www.buymeacoffee.com/cmorales" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
