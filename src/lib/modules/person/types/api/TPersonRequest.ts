import { TPerson } from '@/lib/modules/person/types/TPerson'

export type TPersonRequest = {
	password: string
	username: TPerson['username']
}
