import { UF_Error } from './error'

class UploadFast {
	private serverUrl = 'http://localhost:3000'
	private apiKey: string

	constructor({ publicKey }: { publicKey: string }) {
		this.apiKey = publicKey
	}

	public async upload({ file }: { file: File }) {
		if (!File) {
			throw new UF_Error(404)
		}
		try {
			const formData = new FormData()
			formData.append('file', file)

			const response = await fetch(this.serverUrl + '/upload', {
				method: 'POST',
				body: formData,
				headers: {
					'api-key': `${this.apiKey}`,
				},
			})

			return response.json()
		} catch (error: any | unknown) {
			throw new Error(`An error occured during file upload: ${error.message}`)
		}
	}

	public async uploadMany({ files }: { files: File[] }) {}
}
