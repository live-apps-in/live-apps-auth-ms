export const DI_TYPES = {
	///Service
	AccountService: Symbol.for('AccountService'),
	AuthService: Symbol.for('AuthService'),

	///Repository
	UserRepository: Symbol.for('UserRepository'),
	AuthRepository: Symbol.for('AuthRepository')
};