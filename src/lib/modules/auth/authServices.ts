import { postRequest, resolveRequest } from '@/lib/utils/http-utils'

import { TPersonRequest, TPersonResponse } from '@/lib/modules/person/types'
import { TLogoutResponse } from '@/lib/modules/auth/types'

const postLogin = (credentials: TPersonRequest) =>
	resolveRequest(
		postRequest<TPersonResponse, TPersonRequest>('/login', credentials)
	)

const postLogout = () => resolveRequest(postRequest<TLogoutResponse>('/logout'))

const postRegister = (credentials: TPersonRequest) =>
	resolveRequest(
		postRequest<TPersonResponse, TPersonRequest>('/register', credentials)
	)

export { postLogin, postLogout, postRegister }
