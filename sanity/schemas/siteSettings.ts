import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'homeBanner',
      title: 'Homepage Banner',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'musicBlogBanner',
      title: 'Music Blog Banner',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seriesBanner',
      title: 'Series Default Banner',
      type: 'image',
      options: { hotspot: true },
      description: 'Fallback banner for series pages that have no per-series banner set.',
    }),
    defineField({
      name: 'bonNayIntro',
      title: 'Bọn Này — Intro paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph in the Bọn Này page intro.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
