import 'dotenv/config'

import { UploadFast, createClient } from './index'

import { describe, it, expect } from '@jest/globals'

describe('JavaScript SDK', () => {
	//@ts-ignore
	const apiKey = process.env.API_KEY!
	const uploadfast = createClient({ apiKey })
	let uploadedFileUrl: string

	it('should create an instance of the SDK', () => {
		expect(uploadfast).toBeInstanceOf(UploadFast)
	})

	it('should upload a PNG file and return valid response', async () => {
		// Create a PNG blob
		const base64Content =
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVR42mP8/wcAAwAB/AV5r8HAAAAAElFTkSuQmCC'
		const blob = new Blob([Buffer.from(base64Content, 'base64')], {
			type: 'image/png',
		})

		const file = new File([blob], 'spicymohitas.png', {
			type: 'image/png',
			lastModified: Date.now(),
		})

		const response = await uploadfast.upload({ file: file })
		expect(response[0]?.file_name).toBe('spicymohitas.png')

		uploadedFileUrl = response[0]?.url!
	})

	it('should delete the uploaded file and return valid response', async () => {
		// Use the captured URL of the uploaded file
		const response = await uploadfast.delete({
			resource: 'https://assets.uploadfast.dev/spicymohitas.png',
		})
		expect(response?.message).toBeTruthy()
	})
})
