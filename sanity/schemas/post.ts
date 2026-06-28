import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],
    }),
    defineField({
      name: 'artists',
      title: 'Artists Mentioned',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      description: 'Search existing artists or create new ones inline.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Brief / Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary. Also used as SEO description default.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Video',
          fields: [
            { name: 'url', type: 'url', title: 'YouTube URL' },
          ],
          preview: {
            select: { url: 'url' },
            prepare(value: Record<string, any>) {
              return { title: 'YouTube', subtitle: value.url }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Auto-generated from title. Edit if needed.',
      initialValue: (doc: any) => doc?.title ?? '',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Auto-generated from brief. Edit if needed.',
      initialValue: (doc: any) => doc?.excerpt ?? '',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(value: Record<string, any>) {
      return {
        title: value.title,
        subtitle: value.author ? `by ${value.author}` : '',
        media: value.media,
      }
    },
  },
})