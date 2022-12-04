export class MailDto{
	constructor(
        public readonly to: string,
        public readonly context: Object,
        public readonly type: string,
	){}
}

export enum MailTypes{
    ///Ping
    ping_send_otp = 'ping_send_otp'
}