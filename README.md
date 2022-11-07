# Astro Headless UI

**Work in Progress**

A headless component library for Astro

## [Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)

## Example

```
npm install astro-headless-ui
```

```jsx
---
import { Rating } from 'astro-headless-ui';
import { Icon } from 'astro-icon';
---
<Rating total="5" active="2.5">
    <Icon slot="active" name="codicon:star-full"></Icon>
    <Icon slot="half" name="codicon:star-half"></Icon>
    <Icon slot="disabled" name="codicon:star-empty"></Icon>
</Rating>
```
## Component List

### Components

- **`<Link>`**: Detect if a link is 'active'
- **`<Navigation>`**: Useful for generating a list if links from a config file, active link support
- **`<Breadcrumb>`**: Site/URL hierarchy navigation
- **`<Paginate>`**: Paginate an array of data (SSR version of Astro's SSG `paginate()`)
- **`<Pagination>`**: Multi page link navigation for paginated routes
- **`<Rating>`**: Display a ratio of elements 1/5, 2.5/5, 8/10. Useful for star ratings on products, posts, comments, etc

### Scripts

- **`<ScrollProp>`**: Access `scrollTop` and `scrollLeft` of window or element inside css variables
- **`<MouseProp>`**: Access `clientX`/`clientY` of window or `offsetX`/`offsetY` of element inside css variables
- **`<KeyboardProp>`**: Access last key pressed in window or element in a css variable

- **`<NoScriptProp>`**: ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736)) CSS fallback variable, `false` if javascript is enabled, `initial` if javascript is disabled

### Experimental / WIP

**Components**:

- **`<Map>`**: similar to solidjs `<For>` component with extra features

**Scripts**:

- **`<NetworkProp>`**: Access [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) inside css variables, does not currently work in [Firefox or Safari](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)

## [Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)