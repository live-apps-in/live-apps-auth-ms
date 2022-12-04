export const DI_TYPES = {
	///Service
	AccountService: Symbol.for('AccountService'),
	AuthService: Symbol.for('AuthService'),

	///Shared Service
	QueueService: Symbol.for('QueueService'),

	///Repository
	UserRepository: Symbol.for('UserRepository'),
	AuthRepository: Symbol.for('AuthRepository')
};