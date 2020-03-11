import { AnyObject } from '@appServices/utilities/types';

export interface SubscriptionServiceOptions<D extends string, S extends string> {
	domain: D;
	service: S;
}

export type SubscriptionServiceHook = <D extends string, S extends string>(
	options: SubscriptionServiceOptions<D, S>
) => SubscriptionService;

export interface SubscriptionService {
	subscribe: SubscribeFn;
	getSubscriptions: <Data = AnyObject, Options = AnyObject>() => Subscriptions<Data, Options>;
}

export type SubscribeFn = <Data = AnyObject, Options = AnyObject>(
	cb: SubscriptionCallback<Data>,
	options?: Options
) => VoidFunction;

export interface SubscriptionCallback<TA0 = any, TA1 = any, TA2 = any, TA3 = any> {
	<A0 = TA0>(a0?: A0): void;
	<A0 = TA0, A1 = TA1>(a0?: A0, a1?: A1): void;
	<A0 = TA0, A1 = TA1, A2 = TA2>(a0?: A0, a1?: A1, a2?: A2): void;
	<A0 = TA0, A1 = TA1, A2 = TA2, A3 = TA3>(a0?: A0, a1?: A1, a2?: A2, a3?: A3): void;
}

export type Subscriptions<Data = AnyObject, Options = AnyObject> = {
	[key: string]: Subscription<Data, Options>;
};

export interface Subscription<Data = AnyObject, Options = AnyObject> {
	callback: SubscriptionCallback<Data>;
	options: Options;
}

export interface ServiceRegistry {
	subscribe: SubscribeFn;
	subscriptions: Subscriptions;
}

export interface UpdateSubscriptionProps {
	id: string;
	callback?: SubscriptionCallback;
	options?: AnyObject;
	action?: 'add' | 'remove';
}
