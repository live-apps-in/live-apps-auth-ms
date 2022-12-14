

export class HttpException extends Error{
	constructor(
        public readonly message: string,
        public readonly statusCode: number,
        public readonly error?: any,
	) { 
		super(message);
	}
}

export class ValidationException extends Error{
	constructor(
		public readonly message: string,
		public readonly error: any,
	) {
		super();
	}
}