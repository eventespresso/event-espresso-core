import { Entity } from '../../services/apollo/types';
import {
	EntityActionsManager,
	SubscriptionCallback,
	AdditionalSubscriptionCbOptions,
} from '@appLayout/entityActionMenu';

export type EntityType = 'datetime' | 'ticket';

export type DateMenuKey = 'editDate' | 'deleteTicket' | 'assignTickets';

export type TicketMenuKey = 'editTicket' | 'deleteTicket' | 'assignDates' | 'tpc';

export type Domain = 'eventEditor';

export interface SubscriptionData<E> {
	entityType: EntityType;
	entity: E;
}

export type EntitySubscriptionCallback<
	E extends Entity,
	MenuKey extends string,
	AO = AdditionalSubscriptionCbOptions
> = SubscriptionCallback<MenuKey, SubscriptionData<E>, AO>;

export type EntityActionsMenuCallback<E extends Entity, MenuKey extends string> = (
	entity: E,
	entityActionsManager: EntityActionsManager<MenuKey>
) => void;

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	menuItemProps?: ActionsMenuItemProps;
	[key: string]: any;
}

export interface ActionsMenuItemProps {
	[key: string]: any;
}
