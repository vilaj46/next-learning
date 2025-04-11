import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { AUTH_COOKIE } from '@/lib/constants'

export function middleware(request: NextRequest) {
	const isAuth = !!request.cookies.get(AUTH_COOKIE)

	if (!isAuth) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher: ['/posts/:title*', '/secret', '/todos'],
}
