import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Tác giả',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Tên', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'avatar', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio ngắn', type: 'text' }),
    defineField({ name: 'bioFull', title: 'Bio đầy đủ', type: 'array', of: [{ type: 'block' }] }),
  ],
})