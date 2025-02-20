import { UF_Error } from './error'
import { ApiResponse, UploadResponse } from './types'

export class UploadFast {
	private serverUrl = 'https://uploadfast-server.fly.dev'
	private apiKey: string

	constructor({ apiKey }: { apiKey: string }) {
		if (!apiKey) {
			throw new UF_Error(401, 'API key is required')
		}
		this.apiKey = apiKey
	}

	/**
	 * Uploads one or multiple files to the UploadFast service.
	 *
	 * @param {Object} options - The options object.
	 * @param {File | File[]} options.resource - The file(s) to be uploaded.
	 * @returns {Promise<UploadResponse>} - A Promise that resolves to the upload response.
	 * @throws {UF_Error} - Throws if the resource is invalid or missing.
	 */
	public async upload({
		resource,
	}: {
		resource: File | File[]
	}): Promise<UploadResponse> {
		if (!resource) {
			throw new UF_Error(400, 'Resource is required')
		}

		try {
			const formData = new FormData()
			const files = Array.isArray(resource) ? resource : [resource]

			files.forEach((file) => {
				if (!(file instanceof File)) {
					throw new UF_Error(400, 'Invalid file resource')
				}
				formData.append('file', file)
			})

			const response = await fetch(`${this.serverUrl}/upload`, {
				method: 'POST',
				body: formData,
				headers: {
					'api-key': this.apiKey,
				},
			})

			if (!response.ok) {
				throw new UF_Error(response.status, await response.text())
			}

			return await response.json()
		} catch (error: any) {
			if (error instanceof UF_Error) {
				throw error
			}
			throw new UF_Error(500, `Upload failed: ${error?.message}`)
		}
	}

	/**
	 * Deletes one or multiple resources by their URLs.
	 *
	 * @param {Object} options - The options object.
	 * @param {string | string[]} options.resource - The URL(s) of the resource(s) to delete.
	 * @returns {Promise<DeleteResponse>} - A Promise that resolves when deletion is complete.
	 * @throws {UF_Error} - Throws if the resource is invalid or deletion fails.
	 */
	public async delete({
		resource,
	}: {
		resource: string | string[]
	}): Promise<DeleteResponse> {
		if (!resource) {
			throw new UF_Error(400, 'Resource URL is required')
		}

		try {
			const urls = Array.isArray(resource) ? resource : [resource]
			const results = await Promise.all(
				urls.map((url) =>
					fetch(`${this.serverUrl}/delete`, {
						method: 'DELETE',
						body: JSON.stringify({ file_url: url }),
						headers: {
							'api-key': this.apiKey,
							'Content-Type': 'application/json',
						},
					})
				)
			)

			for (const response of results) {
				if (!response.ok) {
					throw new UF_Error(response.status, await response.text())
				}
			}

			return { message: 'Files deleted successfully' }
		} catch (error: any) {
			if (error instanceof UF_Error) {
				throw error
			}
			throw new UF_Error(500, `Deletion failed: ${error?.message}`)
		}
	}
}

// Add these new types
interface DeleteResponse {
	message: string
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
