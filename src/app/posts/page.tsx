import Link from 'next/link'

import { getAllPosts } from '@/lib/api'

export default function Posts() {
	const posts = getAllPosts()

	return (
		<main>
			<ul className='m-0 p-0'>
				{posts.map((post) => {
					const href = `/posts/${post.slug}`
					return (
						<li key={href}>
							<Link href={href}>{post.title}</Link>
						</li>
					)
				})}
			</ul>
		</main>
	)
}
