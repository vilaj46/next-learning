'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

const LoadingContext = createContext({
	isLoading: false,
	setIsLoading: (_isLoading: boolean) => {},
})

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false)

	const value = {
		isLoading,
		setIsLoading,
	}

	return (
		<LoadingContext.Provider value={value}>
			{isLoading && <div>Loading...</div>}
			{children}
		</LoadingContext.Provider>
	)
}

export const useLoading = () => useContext(LoadingContext)
