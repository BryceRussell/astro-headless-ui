---
layout: '../layouts/CodeCopyLayout.astro'
---

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

```tsx
<Pagination>
  {page => <a href={page.href}>{page.number}</a>}
</Pagination>
```

```tsx
// src/pages/posts/[...page].astro
---
import { Pagination } from 'astro-headless-ui';

export async function getStaticPaths({ paginate }) {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
  return paginate(posts , { pageSize: 10 })  
}

const { page } = Astro.props
---

<nav style="display:flex;gap:.25rem;">
  <Pagination index url="/posts" total={page.last} current={page.current}>
    <active slot="active">{page => <span>{page.number}</span>}</active>
    <span slot="disabled">...</span>
    {page => <a href={page.href}>{page.number}</a>}
  </Pagination>
</nav>
```

```html
<nav style="display:flex;gap:0.25rem;">
    <a href="/posts/">1</a>
    <a href="/posts/2">2</a>
    <span>...</span>
    <a href="/posts/4">4</a>
    <span>5</span>
    <a href="/posts/6">6</a>
    <span>...</span>
    <a href="/posts/9">9</a>
    <a href="/posts/10">10</a>
</nav>
```

```
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non iste doloribus distinctio ipsa culpa atque laboriosam dolor eveniet, cumque in molestias recusandae dolores voluptates ipsam ipsum? Nostrum voluptatem officiis ex voluptate exercitationem, expedita repudiandae, velit provident dolorum iusto veniam aliquid necessitatibus placeat reiciendis id, quisquam voluptates eius ratione dignissimos neque odit! A minus dolorum hic sed sint, ea eum explicabo modi. Iure vel officia, consequuntur consectetur reiciendis odio molestiae eveniet, doloremque voluptatibus illo nam. Impedit iusto aut, officia, rem omnis corrupti, amet repudiandae non minus excepturi voluptatem tenetur officiis voluptate harum quidem quasi! Ipsum accusamus eligendi, vitae illum neque deserunt.
```
