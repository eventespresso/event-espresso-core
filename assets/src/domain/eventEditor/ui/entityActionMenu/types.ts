import { Entity } from '../../services/apollo/types';
import { EntityActionsManager } from '@appLayout/entityActionMenu';

export type EntityType = 'datetime' | 'ticket';

export type DateMenuKey = 'editDate' | 'assignTickets';

export type TicketMenuKey = 'editTicket' | 'assignDates' | 'tpc';

export type Domain = 'eventEditor';

export interface SubscriptionData<E> {
	entityType: EntityType;
	entity: E;
}

export type SubscriptionCallback<E = Entity> = (
	data: SubscriptionData<E>,
	entityActionsManager: EntityActionsManager<DateMenuKey | TicketMenuKey>
) => void;

export type EntityActionsMenuCallback<E extends Entity, MenuKey extends string> = (
	entity: E,
	entityActionsManager: EntityActionsManager<MenuKey>
) => void;

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	position?: 'top' | 'bottom';
	layout?: 'vertical' | 'horizontal';
}
