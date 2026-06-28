import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = createImageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, category->{title, slug},
      series->{title, slug},
      author->{name, slug, avatar},
      artists[]->{name, slug},
      body
    }
  `)
}

export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt,
      mainImage, category->{title, slug},
      series->{title, slug},
      author->{name, slug, avatar, about},
      artists[]->{name, slug},
      body, seoTitle, seoDescription
    }
  `, { slug })
}

export async function getAllAuthors() {
  return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id, name, slug, avatar, about
    }
  `)
}

export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id, title, slug, description
    }
  `)
}

export async function getAllSeries() {
  return client.fetch(`
    *[_type == "series"] | order(title asc) {
      _id, title, slug, description
    }
  `)
}

export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(`
    *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, category->{title, slug},
      author->{name, slug, avatar}
    }
  `, { categorySlug })
}

export async function getPostsBySeries(seriesSlug: string) {
  return client.fetch(`
    *[_type == "post" && series->slug.current == $seriesSlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, series->{title, slug},
      author->{name, slug, avatar}
    }
  `, { seriesSlug })
}

export async function getAuthorBySlug(slug: string) {
  return client.fetch(`
    *[_type == "author" && slug.current == $slug][0] {
      _id, name, slug, avatar, about
    }
  `, { slug })
}

export async function getPostsByAuthor(authorSlug: string) {
  return client.fetch(`
    *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage, category->{title, slug},
      author->{name, slug, avatar}
    }
  `, { authorSlug })
}