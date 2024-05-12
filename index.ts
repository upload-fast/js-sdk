import { UF_Error } from './error'
import { ApiResponse, UploadResponse } from './types'
import axios, { AxiosResponse, ResponseType } from 'axios'

export class UploadFast {
	private serverUrl = 'https://uploadfast-server.fly.dev'
	private apiKey: string

	constructor({ apiKey }: { apiKey: string }) {
		if (!apiKey) {
			throw new Error('Api key required')
		}
		this.apiKey = apiKey
	}

	public async upload({ file }: { file: File }): ReturnType<() => Promise<UploadResponse>> {
		if (!File) {
			throw new UF_Error(404)
		}
		try {
			const formData = new FormData()
			formData.append('file', file)

			const uploadResult: ApiResponse<UploadResponse> = await axios.post(
				this.serverUrl + '/upload',
				formData,
				{
					headers: {
						'api-key': this.apiKey,
					},
				}
			)
			const UploadResponse = uploadResult.data
			return UploadResponse
		} catch (error: any | unknown) {
			throw new Error(`An error occured during file upload: ${error.message}`)
		}
	}

	public async uploadMany({ files }: { files: File[] }) {
		if (!File) {
			throw new UF_Error(404)
		}
		try {
			const formData = new FormData()
			files.forEach((file) => {
				formData.append('file', file)
			})

			const uploadResult: ApiResponse<UploadResponse> = await axios.post(
				this.serverUrl + '/upload',
				formData,
				{
					headers: {
						'api-key': this.apiKey,
					},
				}
			)
			const UploadResponse = uploadResult.data
			return UploadResponse
		} catch (error: any | unknown) {
			throw new Error(`An error occured during file upload: ${error.message}`)
		}
	}
}

export const createClient = ({ apiKey }: { apiKey: string }) => {
	return new UploadFast({ apiKey })
}
