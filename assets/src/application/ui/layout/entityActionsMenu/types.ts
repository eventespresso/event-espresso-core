import React from 'react';
import { Entity } from '@appServices/apollo/types';
import { BaseSubscriptionOptions, Subscriptions, SubscriptionUIRegistry } from '@appServices/subscription';

export interface EntityActionsSubscriptionsOptions<T extends string> {
	entityType?: T; // to limit the subscription only to specific entityType
}

export interface EntityActionsSubscriptionData<E extends Entity, T extends string>
	extends EntityActionsSubscriptionsOptions<T> {
	entity: E;
}

export interface EntityActionsService {
	subscribe: EntityActionsSubscribeFn;
	getSubscriptions: <E extends Entity, T extends string>(
		options?: EntityActionsSubscriptionsOptions<T>
	) => Subscriptions<EntityActionsSubscriptionData<E, T>, EntityActionsSubscriptionsOptions<T>>;
}

export type EntityActionsServiceHook = <Domain extends string>(domain: Domain) => EntityActionsService;

export type EntityActionsSubscribeFn = <E extends Entity, T extends string>(
	cb: EntityActionsSubscriptionCb<E, T>,
	options?: EntityActionsSubscriptionsOptions<T>
) => VoidFunction;

export type EntityActionsSubscriptionCb<E extends Entity, T extends string> = (
	data: EntityActionsSubscriptionData<E, T>,
	entityActionsMenu: EntityActionsMenu
) => void;

/* UI related types */
export interface EntityActionsMenuOptions<D extends string, ET extends string> extends BaseSubscriptionOptions<D> {
	entityType: ET;
	entityId: string;
}

export type EntityActionsMenuHook = <D extends string, ET extends string>(
	options: EntityActionsMenuOptions<D, ET>
) => EntityActionsMenu;

export type EntityActionsMenu = SubscriptionUIRegistry;

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	[key: string]: any;
}

export type EntityMenuItems = {
	[key: string]: React.ReactType;
};
