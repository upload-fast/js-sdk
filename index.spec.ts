import 'dotenv/config'

import { UploadFast } from './index'

import { describe, it, expect } from '@jest/globals'

describe('JavaScript SDK', () => {
	//@ts-ignore
	const apiKey = process.env.API_KEY!
	const uploadfly = new UploadFast({ publicKey: apiKey })
	let uploadedFileUrl: string

	it('should create an instance of the SDK', () => {
		expect(uploadfly).toBeInstanceOf(UploadFast)
	})

	it('should upload a PNG file and return valid response', async () => {
		// Create a PNG blob
		const base64Content =
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVR42mP8/wcAAwAB/AV5r8HAAAAAElFTkSuQmCC'
		const blob = new Blob([Buffer.from(base64Content, 'base64')], {
			type: 'image/png',
		})

		const file = new File([blob], 'spicyyy.png', {
			type: 'image/png',
			lastModified: Date.now(),
		})

		const response = await uploadfly.upload({ file })
		// expect(response.status).toBe(201)
		expect(response[0]?.file_name).toBe('spicyyy.png')

		// Capture the URL of the uploaded file for later use
		// uploadedFileUrl = response?.data?.url as string
	})

	// it('should delete the uploaded file and return valid response', async () => {
	// 	// Use the captured URL of the uploaded file
	// 	const response = await uploadfly.delete(uploadedFileUrl)

	// 	expect(response.success).toBe(true)
	// 	expect(response.status).toBe(200)
	// 	expect(response.data.message).toContain('deleted successfully')
	// })
})
