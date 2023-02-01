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
import { AuthRepository } from '../../api/repository/auth.repository';
import { AuthService } from '../../api/service/auth.service';
import { QueueService } from '../../queue/queue';
import { RestService } from '../../shared/rest.service';
import { PingService } from '../../shared/ping.service';
import { AppRegistrationService } from '../../api/service/app_registration.service';
import { LiveCordService } from '../../shared/live_cord.service';

///Bindings
///Service
container.bind<AccountService>(DI_TYPES.AccountService).to(AccountService);
container.bind<AuthService>(DI_TYPES.AuthService).to(AuthService);
container.bind<AppRegistrationService>(DI_TYPES.AppRegistrationService).to(AppRegistrationService);

///Shared Service
container.bind<QueueService>(DI_TYPES.QueueService).to(QueueService);
container.bind<RestService>(DI_TYPES.RestService).to(RestService);

///Microservice
container.bind<PingService>(DI_TYPES.PingService).to(PingService);
container.bind<LiveCordService>(DI_TYPES.LiveCordService).to(LiveCordService);

///Repository
container.bind<UserRepository>(DI_TYPES.UserRepository).to(UserRepository);
container.bind<AuthRepository>(DI_TYPES.AuthRepository).to(AuthRepository);


export default container;