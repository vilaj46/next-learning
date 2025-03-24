import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

export default async function Post(props: Params) {
	const params = await props.params
	const post = getPostBySlug(params.slug)

	if (!post) {
		return notFound()
	}

	const content = await markdownToHtml(post.content || '')

	return (
		<main>
			<div />
			<h1>{post.title}</h1>
			<div>
				<div />
				<article>
					<div />
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</article>
			</div>
		</main>
	)
}

type Params = {
	params: Promise<{
		slug: string
	}>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
	const params = await props.params
	const post = getPostBySlug(params.slug)

	if (!post) {
		return notFound()
	}

	const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`

	return {
		title,
		openGraph: {
			title,
			images: [post.ogImage.url],
		},
	}
}

export async function generateStaticParams() {
	const posts = getAllPosts()

	console.log(posts)

	return posts.map((post) => ({
		slug: post.slug,
	}))
}
