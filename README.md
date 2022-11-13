# Astro Headless UI

**Work in Progress**

A headless component library for Astro

## [Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)

## Example

```
npm install astro-headless-ui
```

**Product Star Rating**:

```tsx
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

**Paginate an array of posts with page navigation**:

```tsx
---
const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
---
<Paginate data={posts} size="10" page={Astro.params.page}>
    { page => (
        <section>
            { page.data.map(post => (
                <article>
                    <h2>{post.id} - {post.title}</h2>
                    <p>{post.body}</p>
                </article>
            ))}
        </section>
        <nav>
            <Pagination url="/posts" total={page.last} current={page.current}>
                <active slot="active">{page => <span>{page.number}</span>}</active>
                <span slot="disabled">...</span>
                {page => <a href={page.href}>{page.number}</a>}
            </Pagination>
        </nav>
    )}
</Paginate>
```

## [Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)

## Stylesheets

- **`<AnimatedSpriteSheet>`**: Stylesheet template for animating spritesheets

## Components

- **`<Link>`**: Active link component
- **`<Navigation>`**: Generate list of links from an array of objects with attributes, useful for config files
- **`<Breadcrumb>`**: Site/URL hierarchy navigation
- **`<Paginate>`**: Paginate an array of data (SSR version of Astro's SSG `paginate()`)
- **`<Pagination>`**: Multi page link navigation for paginated routes
- **`<Rating>`**: Display a ratio of elements, useful for star ratings on products, posts, comments, etc
- **`<Map>`**: Map over an array of data, use slots to target indexes for alternative render

## Client Side Scripts

- **`<ScrollProp>`**: Access `scrollTop` and `scrollLeft` of window or element inside css variables
- **`<MouseProp>`**: Access `clientX`/`clientY` of window or `offsetX`/`offsetY` of element inside css variables
- **`<KeyboardProp>`**: Access last key pressed in window or element in a css variable
- **`<NoScriptProp>`**: ([@predaytor](https://twitter.com/thepredaytor/status/1576322225606516736)) CSS javascript detector, variable that is `false` if enabled, `initial` if disabled
- - **`<NetworkProp>`**: Access [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) inside css variables, does not currently work in [Firefox or Safari](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)

## [Documentation](https://github.com/BryceRussell/astro-headless-ui/wiki)