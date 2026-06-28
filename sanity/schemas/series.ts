import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'banner',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Overrides the site-wide Series Default Banner for this series.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number appears first. Set 1 for Ẩn Sau Giàn Trống, 2 for Tản Mạn.',
      initialValue: 99,
    }),
  ],
  preview: { select: { title: 'title' } },
})
