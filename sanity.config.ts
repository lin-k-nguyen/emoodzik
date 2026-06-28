import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './sanity/schemas/post'
import author from './sanity/schemas/author'

export default defineConfig({
  name: 'default',
  title: 'EmoodziK',
  projectId: '22wk7h4m',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [post, author],
  },
})