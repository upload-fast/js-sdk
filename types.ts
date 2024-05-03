import { AxiosResponse } from 'axios'

export interface ApiResponse<T> extends AxiosResponse {
	data: T
}

export type UploadResponse = {
	file_name: string
	file_size: number
	url: string
	bucket: string
}[]
