import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
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
