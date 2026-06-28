import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './sanity/schemas/post'
import author from './sanity/schemas/author'
import artist from './sanity/schemas/artist'
import series from './sanity/schemas/series'
import category from './sanity/schemas/category'
import siteSettings from './sanity/schemas/siteSettings'

export default defineConfig({
  name: 'default',
  title: 'EmoodziK',
  projectId: '22wk7h4m',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [post, author, artist, series, category, siteSettings],
  },
})