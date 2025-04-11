import { TPersonResponse } from '@/lib/modules/person/types'
import { TGetHookOptionsClient, useGetHook } from '@/lib/hooks'

import { getPerson } from '@/lib/modules/person/services/personService'

const useGetPerson = (options: TGetHookOptionsClient<TPersonResponse>) =>
	useGetHook({
		...options,
		queryKey: ['person'],
		queryFn: getPerson,
	})

export { useGetPerson }
