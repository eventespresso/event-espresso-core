import React from 'react';
import { BaseSubscriptionOptions, Subscriptions, SubscriptionUIRegistry } from '@appServices/subscription';
import { EntityListFilterStateManager } from '../filterState';

type ELFSM = EntityListFilterStateManager<any>;

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
	filterBar: FilterBarUI<FS>
) => void;

/* UI related types */
export interface FilterBarUIOptions<D extends string, L extends string> extends BaseSubscriptionOptions<D> {
	listId: L;
}

export type FilterBarUIHook = <D extends string, L extends string, FS extends ELFSM>(
	options: FilterBarUIOptions<D, L>
) => FilterBarUI<FS>;

export interface FilterBarComponentProps<FS extends ELFSM> {
	filterState: FS;
}

export type FilterBarUI<FS extends ELFSM> = SubscriptionUIRegistry<FilterBarComponentProps<FS>>;

export type FilterBarUIItemsHook = <FS extends ELFSM, D extends string, L extends string>(
	options: BaseSubscriptionOptions<D> & FilterBarSubscriptionData<FS, L>
) => Array<React.ReactNode>;
