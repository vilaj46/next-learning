import { TPersonResponse } from '@/lib/modules/person/types'
import { getRequest } from '@/lib/utils/http-utils'

const getPerson = () => getRequest<TPersonResponse>('/person')

export { getPerson }
