export class UF_Error extends Error {
	private errorCode: number
	constructor(errorCode: number) {
		super()
		this.constructMessage(errorCode)
		this.name = 'UF_Error'
		this.errorCode = errorCode
	}

	// You can define additional methods specific to your custom error
	logError() {
		console.log(`[${this.name}] Error code ${this.errorCode}: ${this.message}`)
	}

	constructMessage(code: number) {
		switch (code) {
			case 404: {
				this.message = 'No files found'
			}
		}
	}
}

// Thro
