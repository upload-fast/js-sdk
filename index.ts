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

	/**
	 * Uploads a file to the UploadFast service.
	 *
	 * @param {Object} options - The options object.
	 * @param {File} options.file - The file to be uploaded.
	 * @param {File | File[]} options.resource - The file(s) to be uploaded.
	 * @returns {Promise<UploadResponse>} - A Promise that resolves to the upload response.
	 * @throws {UF_Error} - Throws a `UF_Error` with status code 404 if the `file` parameter is not provided.
	 * @throws {Error} - Throws an error if there is an issue with the file upload process.
	 *
	 * @example
	 * const uploadFast = createClient({ apiKey: 'your-api-key' });
	 *
	 * try {
	 *   const uploadResponse = await uploadFast.upload({ file: someFile });
	 *   console.log(uploadResponse);
	 * } catch (error) {
	 *   console.error(error);
	 * }
	 */

	public async upload({
		resource,
	}: {
		resource: File[] | File | undefined
	}): Promise<UploadResponse> {
		try {
			if (resource instanceof File === false) {
				throw new Error('Invalid file resource')
			}
			
			const formData = new FormData()

			if (Array.isArray(resource)) {
				for (const item of resource) {
					formData.append('file', item)
				}
			} else if (resource instanceof File) {
				formData.append('file', resource)
			}

			const requestOptions = {
				method: 'POST',
				body: formData,
				headers: {
					'api-key': this.apiKey,
				},
			}

			const response = await fetch(this.serverUrl + '/upload', requestOptions)
			const uploadResponse: UploadResponse = await response.json()

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			return uploadResponse
		} catch (error) {
			throw new Error(`An error occurred during file upload: ${error}`)
		}
	}

	/**
	 * Upload many images at once
	 * @deprecated Use the upload method with the resource parameter.
	 * @param {Object}
	 * @returns
	 */
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

	public async delete({ resource }: { resource: string | string[] }) {
		if (!resource) {
			throw new Error('Missing resource to delete')
		}

		let deleteResponse: { message: 'File deleted successfully' } | undefined = undefined
		try {
			if (resource instanceof Array) {
				for await (const item of resource) {
					const requestOptions = {
						method: 'DELETE',
						body: JSON.stringify({
							file_url: item,
						}),
						headers: {
							'api-key': this.apiKey,
						},
					}

					const response = await fetch(this.serverUrl + '/delete', requestOptions)
					deleteResponse = await response.json()

					if (!response.ok) {
						throw new Error(
							`An error occured while deleting the file! status: ${response.statusText}`
						)
					}
				}
			} else {
				const requestOptions = {
					method: 'DELETE',
					body: JSON.stringify({
						file_url: resource,
					}),
					headers: {
						'api-key': this.apiKey,
						'Content-Type': 'application/json',
					},
				}

				const response = await fetch(this.serverUrl + '/delete', requestOptions)

				if (!response.ok) {
					throw new Error(
						`An error occured while deleting the file! status: ${await response.text()}`
					)
				}

				deleteResponse = await response.json()
			}

			return deleteResponse
		} catch (error) {
			throw new Error(`An error occurred during file delete: ${error}`)
		}
	}
}

/**
 * Creates an instance of the {@link UploadFast} class.
 *
 * @param {Object} options - The options object.
 * @param {string} options.apiKey - The API key required to use the UploadFast service.
 * @returns {UploadFast} - An instance of the UploadFast class.
 * @throws {Error} - Throws an error if the `apiKey` is not provided or is invalid.
 *
 * @example
 * const uploadFast = createClient({ apiKey: 'your-api-key' });
 */
export const createClient = ({ apiKey }: { apiKey: string }): UploadFast => {
	return new UploadFast({ apiKey })
}
