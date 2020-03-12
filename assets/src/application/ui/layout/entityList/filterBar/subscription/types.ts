import React from 'react';
import { BaseSubscriptionOptions, Subscriptions, UIRegistry } from '@appServices/subscription';
import { EntityListFilterStateManager } from '../filterState';

type ELFSM = EntityListFilterStateManager<any>;

export interface FilterBarUISubscriptionsOptions<L extends string> {
	listId?: L; // to limit the subscription only to specific listId
}

export interface FilterBarUISubscriptionData<FS extends ELFSM, L extends string>
	extends FilterBarUISubscriptionsOptions<L> {
	filterState: FS;
}

export interface FilterBarUISubscription {
	subscribe: FilterBarUISubscribeFn;
	getSubscriptions: <FS extends ELFSM, L extends string>(
		options?: FilterBarUISubscriptionsOptions<L>
	) => Subscriptions<FilterBarUISubscriptionData<FS, L>, FilterBarUISubscriptionsOptions<L>>;
}

export type FilterBarUISubscriptionHook = <Domain extends string>(domain: Domain) => FilterBarUISubscription;

export type FilterBarUISubscribeFn = <FS extends ELFSM, L extends string>(
	cb: FilterBarUISubscriptionCb<FS, L>,
	options?: FilterBarUISubscriptionsOptions<L>
) => VoidFunction;

export type FilterBarUISubscriptionCb<FS extends ELFSM, L extends string> = (
	data: FilterBarUISubscriptionData<FS, L>,
	filterBarUIRegistry: FilterBarUIRegistry<FS>
) => void;

export interface FilterBarUIOptions<D extends string, L extends string> extends BaseSubscriptionOptions<D> {
	listId: L;
}

export type FilterBarUIRegistryHook = <D extends string, L extends string, FS extends ELFSM>(
	options: FilterBarUIOptions<D, L>
) => FilterBarUIRegistry<FS>;

export interface FilterBarUIComponentProps<FS extends ELFSM> {
	filterState: FS;
}

export type FilterBarUIRegistry<FS extends ELFSM> = UIRegistry<FilterBarUIComponentProps<FS>>;

export type FilterBarUIElementsHook = <FS extends ELFSM, D extends string, L extends string>(
	options: BaseSubscriptionOptions<D> & FilterBarUISubscriptionData<FS, L>
) => Array<React.ReactNode>;
