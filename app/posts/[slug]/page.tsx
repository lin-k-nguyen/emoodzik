import { redirect } from 'next/navigation'

export default function OldPostPage({ params }: { params: { slug: string } }) {
  redirect(`/post/${params.slug}`)
}
