export class UF_Error extends Error {
	public readonly code: number;
	private static readonly errorMessages: Record<number, string> = {
		400: 'Bad Request',
		401: 'Unauthorized',
		404: 'Not Found',
		500: 'Internal Server Error'
	};

	constructor(code: number, customMessage?: string) {
		const defaultMessage = UF_Error.errorMessages[code] || 'Unknown Error';
		const message = customMessage || defaultMessage;
		super(message);

		this.code = code;
		this.name = 'UF_Error';

		// Maintains proper stack trace for where error was thrown
		Error.captureStackTrace(this, UF_Error);
	}

	/**
	 * Formats and logs the error details
	 */
	public logError(): void {
		console.error(`[${this.name}] Error ${this.code}: ${this.message}`);
	}

	/**
	 * Returns a JSON representation of the error
	 */
	public toJSON(): Record<string, any> {
		return {
			name: this.name,
			code: this.code,
			message: this.message,
			stack: this.stack
		};
	}
}

// Thro
