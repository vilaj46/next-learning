import axios, { AxiosRequestConfig } from 'axios'

import { backendUrl } from '@/lib/constants'

type TApiBaseResponse<T> = TApiErrorResponse | TApiSuccessResponse<T>

type TApiErrorResponse = {
	error: string
}

type TApiSuccessResponse<Data> = {
	result: Data
}

const isApiResponseSuccess = <T>(
	response?: TApiBaseResponse<T>
): response is TApiSuccessResponse<T> =>
	!!response && (response as TApiSuccessResponse<T>).result !== undefined

const request = async <Data = undefined>(config: AxiosRequestConfig<Data>) => {
	try {
		const response = await axios.request<TApiBaseResponse<Data>>({
			...config,
			baseURL: backendUrl,
			headers: {
				...config.headers,
				'Content-Type': 'application/json; charset=UTF-8',
			},
			withCredentials: true,
		})

		return response
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error.response?.data
		}

		throw {
			error: 'Something went wrong.',
		}
	}
}

const getRequest = async <Data>(url: string): Promise<TApiBaseResponse<Data>> =>
	await request<Data>({
		url,
		method: 'GET',
	})
		.then((res) => {
			return {
				...res.data,
			}
		})
		.catch((error) => {
			return {
				error,
			}
		})

const postRequest = async <ResponseType, Data = undefined>(
	url: string,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<TApiBaseResponse<ResponseType>> => {
	try {
		const response = await axios.post<TApiBaseResponse<ResponseType>>(
			`${backendUrl}${url}`,
			data,
			{
				withCredentials: true,
				...config,
			}
		)

		return response.data
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const error = err.response?.data

			if (!isApiResponseSuccess(error)) {
				throw error
			}
		}

		throw {
			error: 'Something went wrong.',
		}
	}
}

const resolveRequest = <ResponseType>(
	request: Promise<TApiBaseResponse<ResponseType>>
) => {
	return request.then((res) => {
		if (isApiResponseSuccess(res)) {
			return res
		}

		throw {
			error: 'Something went wrong.',
		}
	})
}

export { getRequest, isApiResponseSuccess, postRequest, resolveRequest }

export type { TApiBaseResponse, TApiErrorResponse, TApiSuccessResponse }
