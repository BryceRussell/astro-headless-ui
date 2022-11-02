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
import { Rating, Icon } from 'astro-headless-ui'
---
<Rating total="5" active="2.5">
    <Icon slot="active" icon="codicon:star-full"></Icon>
    <Icon slot="half" icon="codicon:star-half"></Icon>
    <Icon slot="disabled" icon="codicon:star-empty"></Icon>
</Rating>
```
## Component List

### Server Side Components

- **`<A>`**: Active link, use slots to define an alternative render if `href` prop matches `Astro.url.pathname`
- **`<Paginate>`**: SSR version of Astro's SSG `paginate()`
- **`<Pagination>`**: Multi page link navigation for paginated routes
- **`<Breadcrumb>`**:  Site/URL hierarchy navigation 
- **`<Rating>`**: Display a ratio of elements 1/5, 2.5/5, 8/10. Useful for star ratings on products, posts, comments, etc

### Client Side Components

- **`<Icon>`**: Component wrapper for [`iconify-icon`](https://docs.iconify.design/iconify-icon/) web component, type support and automatic client side importing

### Client Side Scripts

- **`<NoScriptProp>`**: ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736)): CSS fallback variable, `false` if javascript is enabled, `initial` if javascript is diabled
- **`<ScrollProp>`**: Access `scrollTop` and `scrollLeft` of window or element inside css variables
- **`<MouseProp>`**: Access `clientX`/`clientY` of window or `offsetX`/`offsetY` of element inside css variables
- **`<KeyboardProp>`**: Access last key pressed in window or element in a css variable

### Experimental

**Components**:

- **`<Map>`**: Component based absraction of the Array prototype and mapping using slot API, similar syntax to solidjs `<For>` with extra features

**Scripts**:
 
- **`<NetworkProp>`**: Access [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) inside css variables, does not currently work in [Firefox or Safari](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)

## [Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)