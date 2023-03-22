# Astro Headless UI

![npm](https://img.shields.io/npm/v/astro-headless-ui?label=version%20&logo=npm)
![npm](https://img.shields.io/npm/dm/astro-headless-ui?label=downloads&logo=npm)

A headless component library for Astro

> **Note**: This project is a work in progress, components with documentation are finished, if there are any changes they will be recorded in the wiki changelog

## **[Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)**

**[Examples](https://github.com/BryceRussell/astro-headless-ui/wiki#examples)**

**[Changelog](https://github.com/BryceRussell/astro-headless-ui/wiki/*Changelog)**

**[Submit an issue for bugs or suggestions](https://github.com/BryceRussell/astro-headless-ui/issues/new)**

## Style Components

HTML Element with an attached stylesheet

- **[`<NoScriptProperty>`](https://github.com/BryceRussell/astro-headless-ui/wiki/NoScriptProperty)**: CSS javascript detector ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736))
- **[`<AnimatedSpriteSheet>`](https://github.com/BryceRussell/astro-headless-ui/wiki/AnimatedSpriteSheet)**: Animates a spritesheet as a background image on an element using css
- **[`<IconSwitcher>`](https://github.com/BryceRussell/astro-headless-ui/wiki/IconSwitch)** Animated icon switcher, used to display current theme, copy button state, and more using icons

## Components

Generates structured HTML

- **[`<Rating>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Rating)**: Display a ratio using elements, useful for star ratings on products, posts, etc
- **[`<Link>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Link)**: Active link component, used in [`<Navigation>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Navigation) to generate link navigations
- **[`<Navigation>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Navigation)**: Generate a list of links using props, useful for config files
- **`<TableOfContents>`**: Generates a table of contents
- **[`<Breadcrumb>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Breadcrumb)**: Site/URL hierarchy navigation
- **[`<Pagination>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Pagination)**: Page navigation for paginated routes
- **[`<Paginate>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Paginate)**: SSR component version of Astro's SSG [`paginate()`](https://docs.astro.build/en/core-concepts/routing/#pagination)

### Utility / Flow Components

- **[`<Wrap>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Wrap)**: Conditionally wrap a component
- **[`<When>`](https://github.com/BryceRussell/astro-headless-ui/wiki/When)**: acts like a conditional/ternary statement, mostly used for `<Switch/>`
- **[`<Switch>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Switch)**: Advanced conditional rendering, similar to [SolidJS `<Switch>`](https://www.solidjs.com/docs/latest/api#switchmatch) with extra features using slots
- **[`<For>`](https://github.com/BryceRussell/astro-headless-ui/wiki/For)**: `.map()` in component form with extra features, similar to [SolidJS `<For>`](https://www.solidjs.com/docs/latest/api#for)

## Client Components

HTML element with client side interactivity using `<script>`

- **[`<DarkThemeToggle>`](https://github.com/BryceRussell/astro-headless-ui/wiki/DarkThemeToggle)**: Dark theme toggle button/script
- **[`<MultiThemeToggle>`](https://github.com/BryceRussell/astro-headless-ui/wiki/MultiThemeToggle)**: Multi theme toggle button(s)/script
- **`<CopyCode>`**: Attaches a button that copies code to all selected codeblocks

## Client Scripts

Client side script that does not include HTML

- **`<ScrollProperty>`**: Access scroll position of window or element inside CSS as custom properties
- **`<MouseProperty>`**: Access mouse position of window or element inside CSS as custom properties

## Utility

`astro-headless-ui/util`

- **`hashId()`**: Create a hash from a string, for scoping CSS, HTML elements, and `<script>` tags
