# Astro Headless UI

![npm](https://img.shields.io/npm/v/astro-headless-ui?label=version%20&logo=npm)
![npm](https://img.shields.io/npm/dm/astro-headless-ui?label=downloads&logo=npm)

A headless component library for Astro

> **Note**: This project is a work in progress, components with documentation are finished, if there are any changes they will be recorded in the wiki changelog

**[Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)**

**[Examples](https://github.com/BryceRussell/astro-headless-ui/wiki#examples)**

**[Changelog](https://github.com/BryceRussell/astro-headless-ui/wiki/*Changelog)**

## Style Components

HTML Element with an attached stylesheet

- **[`<AnimatedSpriteSheet>`](https://github.com/BryceRussell/astro-headless-ui/wiki/AnimatedSpriteSheet)**: Stylesheet template for animating spritesheets
- **`<IconSwitch>`** Animated icon switch, used to display current theme, copy button state, and more using icons

## Components

HTML generator

- **[`<Rating>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Rating)**: Display a fraction using elements, useful for star ratings on products, posts, etc
- **[`<Link>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Link)**: Active link component
- **[`<Navigation>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Navigation)**: Generate a list of links using props, useful for config files
- **[`<Breadcrumb>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Breadcrumb)**: Site/URL hierarchy navigation
- **[`<Paginate>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Paginate)**: SSR component version of Astro's SSG [`paginate()`](https://docs.astro.build/en/core-concepts/routing/#pagination)
- **[`<Pagination>`](https://github.com/BryceRussell/astro-headless-ui/wiki/Pagination)**: Page navigation for paginated routes
- **`<Map>`**: `.map()` with extra features, easier to do nested mapping

## Client Components

HTML Element with client side interactivity using `<script>`

- **[`<DarkThemeToggle>`](https://github.com/BryceRussell/astro-headless-ui/wiki/DarkThemeToggle)**: Dark theme toggle button/script
- **[`<MultiThemeToggle>`](https://github.com/BryceRussell/astro-headless-ui/wiki/MultiThemeToggle)**: Multi theme toggle button/script
- **`<CopyCode>`**: Code copying button attached to all selected codeblocks

## Client Scripts

Client side scripts that do not include HTML

- **`<NoScriptProp>`**: CSS javascript detector ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736))
- **`<ScrollProp>`**: Access scroll position of window or element inside CSS properties
- **`<MouseProp>`**: Access mouse position of window/element inside CSS properties
- **`<KeyboardProp>`**: Access last key pressed in window or element inside CSS property
- **`<NetworkProp>`**: Access [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) inside CSS properties

## Utility Functions

```
import {} from 'astro-headless-ui/util';
```

- **hashId()**: Create a hash from a string, for scoping CSS, HTML elements, and `<script>`s
