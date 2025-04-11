import { getRequest } from '@/lib/utils/http-utils'

import { TTodosResponse } from '@/lib/modules/todos/types/api/TTodosResponse'

const getTodos = ({ limit, offset }: { limit: number; offset: number }) =>
	getRequest<TTodosResponse>(`/todos?limit=${limit}&offset=${offset}`)

const getTodosCursor = ({
	cursor,
	limit,
}: {
	cursor: null | number
	limit: number
}) =>
	getRequest<{
		nextCursor: number
		todos: TTodosResponse
	}>(`/todos/cursor?cursor=${cursor}&offset=${limit}`)

export { getTodos, getTodosCursor }
