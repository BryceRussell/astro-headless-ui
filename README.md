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

- **`<NoScriptProp>`**: ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736)): CSS variable that allows you to set a fallback style if javascript is is disabled in the browser
- **`<ScrollProp>`**: Client side script that allows you to access the scroll X/Y position of the window or element in CSS using CSS variables
- **`<MouseProp>`**: Client side script that allows you to access the mouse X/Y position of the window or element in CSS using CSS variables
- **`<KeyboardProp>`**: Client side script that allows you to access the last key pressed in the window or element in CSS using CSS variables
- **`<NetworkProp>`**: Client side script that allows you to access the Network Information API in CSS using CSS variables

## Experimental

- **`<Map>`**: Component based absraction of the Array prototype and mapping using slot API, similar syntax to solidjs `<For>` with extra features