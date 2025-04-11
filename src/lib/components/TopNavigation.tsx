'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getPerson } from '@/lib/modules/person/services'
import { isApiResponseSuccess } from '@/lib/utils'
import { useLogoutMutation } from '@/lib/modules/auth/hooks/requests'

const TopNavigation = () => {
	const router = useRouter()

	const person = useQuery({
		queryKey: ['person'],
		queryFn: getPerson,
	})

	const { mutate: logoutMutation } = useLogoutMutation({
		onSuccess: () => {
			router.push('/')
		},
	})

	const username =
		isApiResponseSuccess(person.data) && person.data.result.username

	return (
		<nav className='border flex flex-row p-4'>
			<Link href='/'>Home</Link>

			{person.isFetching ? (
				<div className='ml-auto'>Loading...</div>
			) : username ? (
				<button
					className='ml-auto'
					onClick={() => logoutMutation(undefined)}
				>
					Logout
				</button>
			) : (
				<Link
					className='ml-auto'
					href='/login'
				>
					Login
				</Link>
			)}
		</nav>
	)
}

export default TopNavigation
