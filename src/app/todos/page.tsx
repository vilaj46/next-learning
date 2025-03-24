'use client'

import { MouseEvent, useEffect, useState } from 'react'

type TodoDTO = {
	id: number
	isComplete: boolean
	name: null | string
}

export default function Home() {
	const [value, setValue] = useState('')
	const [todos, setTodos] = useState<Array<TodoDTO>>([])

	useEffect(() => {
		fetch('http://localhost:5189/todos')
			.then((res) => res.json())
			.then((data) => setTodos(data))
			.catch((err) => console.log(err))
	}, [])

	const addTodo = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		fetch('http://localhost:5189/todos', {
			body: JSON.stringify({
				id: Math.floor(Math.random() * 100),
				isComplete: false,
				name: value,
			}),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			method: 'POST',
		})
	}

	return (
		<div>
			<h1>Todos</h1>
			<form>
				<input
					onChange={(e) => setValue(e.target.value)}
					type='text'
					value={value}
					style={{
						border: '1px solid red',
					}}
				/>
				<button onClick={addTodo}>Add todo</button>
			</form>
			{todos.map((todo) => (
				<li key={todo.id}>{todo.name ?? 'UNKNOWN'}</li>
			))}
		</div>
	)
}
