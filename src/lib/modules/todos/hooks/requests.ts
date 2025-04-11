import { TTodosResponse } from '@/lib/modules/todos/types/api/TTodosResponse'
import { TGetHookOptionsClient, useGetHook } from '@/lib/hooks'

import {
	getTodos,
	getTodosCursor,
} from '@/lib/modules/todos/services/todoService'

const useGetTodos = (
	{ limit, offset }: { limit: number; offset: number },
	options?: TGetHookOptionsClient<TTodosResponse>
) =>
	useGetHook({
		...options,
		queryKey: ['todos', limit, offset],
		queryFn: () => getTodos({ limit, offset }),
	})

const useGetTodosCursor = (
	{ cursor, limit }: { cursor: null | number; limit: number },
	options?: TGetHookOptionsClient<{
		nextCursor: number
		todos: TTodosResponse
	}>
) =>
	useGetHook({
		...options,
		queryKey: ['todos', cursor, limit],
		queryFn: () => getTodosCursor({ cursor, limit }),
	})

export { useGetTodos, useGetTodosCursor }
