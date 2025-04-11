import { TPersonRequest, TPersonResponse } from '@/lib/modules/person/types'
import { MutationHookOptions, useMutationHook } from '@/lib/hooks'

import {
	postLogin,
	postLogout,
	postRegister,
} from '@/lib/modules/auth/authServices'
import { TLogoutResponse } from '@/lib/modules/auth/types'

const useLoginMutation = (
	options?: MutationHookOptions<TPersonResponse, TPersonRequest>
) =>
	useMutationHook({
		...options,
		invalidateQueryKeys: ['person'],
		mutationFn: postLogin,
	})

const useLogoutMutation = (options?: MutationHookOptions<TLogoutResponse>) =>
	useMutationHook({
		...options,
		invalidateQueryKeys: ['person'],
		mutationFn: postLogout,
	})

const useRegisterMutation = (
	options?: MutationHookOptions<TPersonResponse, TPersonRequest>
) =>
	useMutationHook({
		...options,
		mutationFn: postRegister,
	})

export { useLoginMutation, useLogoutMutation, useRegisterMutation }
