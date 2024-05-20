import { UF_Error } from './error'
import { ApiResponse, UploadResponse } from './types'

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
		if (!file) {
			throw new UF_Error(404)
		}
		try {
			const formData = new FormData()
			formData.append('file', file)

			const requestOptions = {
				method: 'POST',
				body: formData,
				headers: {
					'api-key': this.apiKey,
				},
			}

			const response = await fetch(this.serverUrl + '/upload', requestOptions)
			const uploadResponse = await response.json()

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			return uploadResponse
		} catch (error) {
			throw new Error(`An error occurred during file upload: ${error}`)
		}
	}

	public async uploadMany({ files }: { files: File[] }) {
		if (!files) {
			throw new UF_Error(404)
		}
		try {
			const formData = new FormData()
			files.forEach((file) => {
				formData.append('file', file)
			})

			const requestOptions = {
				method: 'POST',
				body: formData,
				headers: {
					'api-key': this.apiKey,
				},
			}

			const response = await fetch(this.serverUrl + '/upload', requestOptions)
			const uploadResponse = await response.json()

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			return uploadResponse
		} catch (error) {
			throw new Error(`An error occurred during file upload: ${error}`)
		}
	}
}

export const createClient = ({ apiKey }: { apiKey: string }) => {
	return new UploadFast({ apiKey })
}
