import { MarkdownInstance } from "astro"

export function filterPosts<T extends {draft:boolean}>(...posts: MarkdownInstance<T>[][]): MarkdownInstance<T>[] {
    return posts.flat().filter(post => post.frontmatter.draft !== true)
}

export function sortDates<T>(key: string ='date', sort: 1|-1 = 1, ...posts: MarkdownInstance<T>[][]): MarkdownInstance<T>[] {
    return posts.flat().sort((a, b) => {
        const aa = a.frontmatter[key] ? Date.parse(a.frontmatter[key]) : 1
        const bb = b.frontmatter[key] ? Date.parse(b.frontmatter[key]) : -1
        return sort === 1 ? bb - aa : aa - bb
    })
}

export function filterSort<T>(...posts: MarkdownInstance<T>[][]): MarkdownInstance<T>[] {
    return sortDates(filterPosts(posts.flat()))
}

export function getAllTags<T>(...posts: MarkdownInstance<T>[][]): string[] {
    // Get all tags in an array of posts including duplicates
    return posts.flat().map(post => post.frontmatter.tags||[]).flat()
}

export function getTags<T>(...posts: MarkdownInstance<T>[][]): string[] {
    // Get all tags in an array of posts without duplicates
    return [...new Set(getAllTags(...posts))]
}

export function tagFrequency<T>(...posts: MarkdownInstance<T>[][]): Record<string, number> {
    // Number of times each tag is used inside an array of posts
    const freqMap: Record<string, number> = {};
    
    for (const tag of getAllTags(...posts)) {
        freqMap[tag] = (freqMap[tag] || 0) + 1;
    }

    return Object.fromEntries(
        Object.entries(freqMap).sort(([,a],[,b]) => b-a)
    )
}