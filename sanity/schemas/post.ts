import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Bài viết',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tiêu đề', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Tóm tắt', type: 'text' }),
    defineField({ name: 'mainImage', title: 'Ảnh bìa', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'category', title: 'Chuyên mục', type: 'string', options: { list: ['Tổng Hợp','Quen Quen','Lạ Lạ','Ăn Bum','Ăn View'] } }),
    defineField({ name: 'series', title: 'Series', type: 'string', options: { list: ['an-sau-gian-trong','tan-man'] } }),
    defineField({ name: 'author', title: 'Tác giả', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'publishedAt', title: 'Ngày đăng', type: 'datetime' }),
    defineField({ name: 'readingTime', title: 'Thời gian đọc', type: 'string' }),
    defineField({ name: 'artists', title: 'Nghệ sĩ nhắc tới', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'body', title: 'Nội dung', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})