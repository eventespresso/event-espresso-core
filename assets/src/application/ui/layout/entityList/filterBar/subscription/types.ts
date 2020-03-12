import React from 'react';
import { Subscriptions } from '@appServices/subscription';
import { EntityListFilterStateManager as ELFSM } from '../filterState';

export interface FilterBarSubscriptionsOptions<L extends string> {
	listId?: L; // to limit the subscription only to specific listId
}

export interface FilterBarSubscriptionData<FS extends ELFSM, L extends string>
	extends FilterBarSubscriptionsOptions<L> {
	filterState: FS;
}

export interface FilterBarService {
	subscribe: FilterBarSubscribeFn;
	getSubscriptions: <FS extends ELFSM, L extends string>(
		options?: FilterBarSubscriptionsOptions<L>
	) => Subscriptions<FilterBarSubscriptionData<FS, L>, FilterBarSubscriptionsOptions<L>>;
}

export type FilterBarServiceHook = <Domain extends string>(domain: Domain) => FilterBarService;

export type FilterBarSubscribeFn = <FS extends ELFSM, L extends string>(
	cb: FilterBarSubscriptionCb<FS, L>,
	options?: FilterBarSubscriptionsOptions<L>
) => VoidFunction;

export type FilterBarSubscriptionCb<FS extends ELFSM, L extends string> = (
	data: FilterBarSubscriptionData<FS, L>,
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
