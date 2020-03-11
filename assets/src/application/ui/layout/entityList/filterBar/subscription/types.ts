import React from 'react';
import { Entity } from '@appServices/apollo/types';
import { Subscriptions } from '@appServices/subscription';

export interface SubscriptionsOptions<T extends string> {
	entityType?: T; // to limit the subscription only to specific entityType
}

export interface SubscriptionData<E extends Entity, T extends string> extends SubscriptionsOptions<T> {
	entity: E;
}

export interface FilterBarService {
	subscribe: SubscribeFn;
	getSubscriptions: <E extends Entity, T extends string>(
		options?: SubscriptionsOptions<T>
	) => Subscriptions<SubscriptionData<E, T>, SubscriptionsOptions<T>>;
}

export type FilterBarServiceHook = <Domain extends string>(domain: Domain) => FilterBarService;

export type SubscribeFn = <E extends Entity, T extends string>(
	cb: FilterBarSubscriptionCb<E, T>,
	options?: SubscriptionsOptions<T>
) => VoidFunction;

export type FilterBarSubscriptionCb<E extends Entity, T extends string> = (
	data: SubscriptionData<E, T>,
	filterBar: FilterBar
) => void;

export interface FilterBar {
	registerFilterBarItem: (key: string, component: React.ReactType) => void;
	unRegisterFilterBarItem: (key: string) => void;
	getFilterBarItems: () => FilterBarItems;
}

export type FilterBarItems = {
	[key: string]: React.ReactType;
};
