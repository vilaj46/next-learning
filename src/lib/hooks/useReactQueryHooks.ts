import {
	QueryKey,
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from '@tanstack/react-query'

import { TApiErrorResponse, TApiSuccessResponse } from '@/lib/utils/http-utils'

import { useLoading } from '@/lib/providers'
import { TApiBaseResponse } from '@/lib/utils/http-utils'

export type TGetHookOptionsClient<T> = Partial<
	UseQueryOptions<TApiBaseResponse<T>>
>

const useGetHook = <T>(options: UseQueryOptions<T>) => {
	return useQuery({
		...options,
	})
}

export type MutationHookOptions<
	Response,
	Request = undefined
> = UseMutationOptions<
	TApiSuccessResponse<Response>,
	TApiErrorResponse,
	Request
> & {
	invalidateQueryKeys?: QueryKey
}

const useMutationHook = <Response, Request = undefined>(
	options: MutationHookOptions<Response, Request>
) => {
	const queryClient = useQueryClient()
	const { setIsLoading } = useLoading()

	return useMutation({
		...options,
		onError: (...args) => {
			if (options.onError) {
				options.onError(...args)
			}
		},
		onMutate: (...args) => {
			setIsLoading(true)

			if (options.onMutate) {
				options.onMutate(...args)
			}
		},
		onSettled: (...args) => {
			setIsLoading(false)

			if (options.onSettled) {
				options.onSettled(...args)
			}
		},
		onSuccess: (...args) => {
			if (options.invalidateQueryKeys) {
				queryClient.invalidateQueries({
					queryKey: options.invalidateQueryKeys,
				})
			}

			if (options.onSuccess) {
				options.onSuccess(...args)
			}
		},
	})
}

export { useGetHook, useMutationHook }
