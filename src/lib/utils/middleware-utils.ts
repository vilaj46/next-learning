import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'

const isUnAuthenticated = (cookies: RequestCookies) => {
	if (cookies.has('user')) {
		return false
	}

	return true
}

export { isUnAuthenticated }
