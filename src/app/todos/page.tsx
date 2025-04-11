'use client'

import { useEffect, useState } from 'react'

import {
	useGetTodos,
	useGetTodosCursor,
} from '@/lib/modules/todos/hooks/requests'
import { isApiResponseSuccess } from '@/lib/utils/http-utils'
import { TTodo } from '@/lib/modules/todos/types/TTodo'

const useTodosOffset = (isEnabled: boolean) => {
	const [offset, setOffset] = useState(0)
	const [todos, setTodos] = useState<Array<TTodo>>([])

	const getTodoQuery = useGetTodos(
		{
			limit: 100,
			offset,
		},
		{
			enabled: isEnabled,
		}
	)

	useEffect(() => {
		if (isApiResponseSuccess(getTodoQuery.data)) {
			const tSuccess = getTodoQuery.data.result
			setTodos((t) => t.concat(tSuccess))
		}
	}, [getTodoQuery.data])

	return {
		offset,
		setOffset,
		todos,
	}
}

const useTodosCursor = (isEnabled: boolean) => {
	const [cursor, setCursor] = useState<null | number>(null)
	const [todos, setTodos] = useState<Array<TTodo>>([])

	const todosQuery = useGetTodosCursor(
		{
			cursor,
			limit: 100,
		},
		{
			enabled: isEnabled,
		}
	)

	useEffect(() => {
		if (isApiResponseSuccess(todosQuery.data)) {
			const tSuccess = todosQuery.data.result
			setTodos((t) => t.concat(tSuccess.todos))
		}
	}, [todosQuery.data])

	return {
		setCursor,
		todos,
		todosQuery,
	}
}

export default function Todos() {
	const fetchType: number = -1

	const {
		offset,
		setOffset,
		todos: offsetTodos,
	} = useTodosOffset(fetchType === 0)

	const { setCursor, todosQuery, todos } = useTodosCursor(fetchType === 1)

	return (
		<div>
			<h1>Todos</h1>
			{fetchType === 1 ? (
				<>
					<button
						onClick={() => {
							if (isApiResponseSuccess(todosQuery.data)) {
								const tSuccess = todosQuery.data.result
								setCursor(tSuccess.nextCursor)
							}
						}}
					>
						Get more! {offset}
					</button>

					<ul>
						{todos.map((todo) => (
							<li key={todo.id}>
								{todo.todo} - {todo.id}
							</li>
						))}
					</ul>
				</>
			) : (
				<>
					<button
						onClick={() => {
							setOffset((co) => co + 100)
						}}
					>
						Get more! {offset}
					</button>

					<ul>
						{offsetTodos.map((todo) => (
							<li key={todo.id}>
								{todo.todo} - {todo.id}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	)
}
