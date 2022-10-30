# Astro Headless UI

A headless component library for Astro

## Components

- **`<Paginate>`**: SSR version of Astro's static `paginate()`
- **`<Pagination>`**: MPA link navigation for paginated routes
- **`<Breadcrumb>`**:  Site/URL hierarchy navigation 
- **`<A>`**: Active link, define an alternative render if `href` prop matches url.pathname
- **`<Rating>`**: Display a rating/ratio, useful for product ratings like 4/5 stars
- **`<Icon>`**: Astro component wrapper for the `iconify-icon` web component (100k+ icons)

## Client Side Scripts

- **`<NoScriptProp>`**: ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736)): CSS fallback variable, `false` if javascript is enabled, `initial` if javascript is diabled
- **`<ScrollProp>`**: Access `scrollTop` and `scrollLeft` of window or element inside css variables
- **`<MouseProp>`**: Access `clientX`/`clientY` of window or `offsetX`/`offsetY` of element inside css variables
- **`<KeyboardProp>`**: Access last key pressed in window or element in a css variable

## Experimental

**Components**:

- **`<Map>`**: Component based absraction of the Array prototype and mapping using slot API, similar syntax to solidjs `<For>` with extra features

**Client Side Scripts**:
 
- **`<NetworkProp>`**: Access [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) inside css variables, does not currently work in [Firefox or Safari](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)