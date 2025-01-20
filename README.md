# UploadFast JS SDK

A lightweight JavaScript SDK for seamlessly uploading and managing files with
[UploadFast](https://www.uploadfast.dev).

UploadFast is a media management platform that leverages cloudflare's global edge network to serve
your users images and videos (fast)!

This SDK provides a simple interface for handling file uploads, deletions, and management in your
web applications.

## Installation

Install using your preferred package manager:

```bash
npm install @uploadfast/client
# or
yarn add @uploadfast/client
# or
pnpm add @uploadfast/client
```

## Quick Start

```typescript
import { createClient } from '@uploadfast/client'

// Initialize the client
const uploadfast = createClient({
	apiKey: 'your_api_key_here',
})

// Upload a single file
const file = new File(['file content'], 'example.png', { type: 'image/png' })
try {
	const response = await uploadfast.upload({ resource: file })
	console.log('Upload successful:', response[0].url)
} catch (error) {
	console.error('Upload failed:', error)
}
```

### API Reference

#### Initialization

Create a new UploadFast client instance:

```typescript
import { createClient } from '@uploadfast/client'

const uploadfast = createClient({
	apiKey: process.env.UPLOAD_FAST_API_KEY,
})
```

#### File Upload

Upload a single file or multiple files:

```typescript
// Single file upload
const file = new File(['content'], 'example.png', { type: 'image/png' })
const response = await uploadfast.upload({
	resource: file,
})
// response type: { file_name: string; file_size: number; url: string; bucket: string; }[]

// Multiple files upload
const files = [
	new File(['content1'], 'example1.png', { type: 'image/png' }),
	new File(['content2'], 'example2.jpg', { type: 'image/jpeg' }),
]
const response = await uploadfast.upload({
	resource: files,
})
```

#### Response Types

The upload method returns an array of file information:

```typescript
type UploadResponse = {
	file_name: string
	file_size: number
	url: string
	bucket: string
}[]
```

#### Error Handling

The SDK provides detailed error messages that you can catch and handle:

```typescript
try {
	const response = await uploadfast.upload({ resource: file })
} catch (error) {
	if (error.message.includes('Invalid file resource')) {
		console.error('Please provide a valid File object')
	} else {
		console.error('Upload failed:', error.message)
	}
}
```

### Author

- [@Uploadfast](https://www.github.com/upload-fast)
