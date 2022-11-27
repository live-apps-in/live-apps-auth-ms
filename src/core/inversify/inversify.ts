import 'reflect-metadata';
import { Container } from 'inversify';

const container = new Container({
	defaultScope: 'Singleton'
});

///Import all controllers
import './controllers';
import { AccountService } from '../../api/service/account.service';
import { DI_TYPES } from './types.di';
import { UserRepository } from '../../api/repository/users.repository';

///Bindings
///Service
container.bind<AccountService>(DI_TYPES.AccountService).to(AccountService);

///Repository
container.bind<UserRepository>(DI_TYPES.UserRepository).to(UserRepository);


export default container;