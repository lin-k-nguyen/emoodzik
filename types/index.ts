export interface Author {
  slug: string
  name: string
  avatar: string
  role: string
  bio: string
  bioParas: string[]
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  readingTime: string
  artists: string[]
  author: string
  body: string[]
  series?: string
}

export interface Category {
  slug: string
  label: string
  blurb: string
}

export interface Series {
  slug: string
  label: string
  blurb: string
}

export interface DecoratedPost extends Post {
  href: string
  meta: string
  imageBg: string
  authorData: Author
  authorAvatarBg: string
  categoryHref: string
  authorHref: string
  bodyParas: { text: string; cls: string }[]
  hasArtists: boolean
  artistTags: { name: string; href: string }[]
}
