'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { TPersonRequest } from '@/lib/modules/person/types'

import {
	useLoginMutation,
	useRegisterMutation,
} from '@/lib/modules/auth/hooks/requests'

const Login = () => {
	const router = useRouter()

	const [credentials, setCredentials] = useState<TPersonRequest>({
		password: '',
		username: '',
	})

	const { mutate: loginMutate } = useLoginMutation({
		onSuccess: () => {
			router.push('/posts')
		},
	})

	const { mutate: registerMutate } = useRegisterMutation({})

	const onChange = (event: ChangeEvent<HTMLInputElement>) =>
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		})

	return (
		<div>
			<label className='block'>
				Username:
				<input
					className='border'
					name='username'
					onChange={onChange}
					type='text'
					value={credentials.username}
				/>
			</label>
			<label className='block'>
				Password:
				<input
					className='border'
					name='password'
					onChange={onChange}
					type='password'
					value={credentials.password}
				/>
			</label>

			<button
				className='border'
				onClick={() => loginMutate(credentials)}
			>
				Login
			</button>
			<button
				className='border'
				onClick={() => registerMutate(credentials)}
			>
				Register
			</button>
		</div>
	)
}

export default Login
