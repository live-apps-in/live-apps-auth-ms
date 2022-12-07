export const DI_TYPES = {
	///Service
	AccountService: Symbol.for('AccountService'),
	AuthService: Symbol.for('AuthService'),

	///Shared Service
	QueueService: Symbol.for('QueueService'),
	RestService: Symbol.for('RestService'),

	///Microservice
	PingService: Symbol.for('PingService'),

	///Repository
	UserRepository: Symbol.for('UserRepository'),
	AuthRepository: Symbol.for('AuthRepository')
};