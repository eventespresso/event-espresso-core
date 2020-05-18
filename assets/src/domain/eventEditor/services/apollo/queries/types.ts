import { Entity, EntityId } from '@dataServices/types';
import { RelationEntity } from '@appServices/apollo/relations';

export interface EntityItemProps {
	id: EntityId;
}

export type EntityListName = 'Datetimes' | 'Tickets' | 'Prices' | 'PriceTypes';

export type RelatedEntitiesHook<E extends Entity, RE extends RelationEntity> = (args: {
	entity: Exclude<RelationEntity, RE>;
	entityId: EntityId;
}) => Array<E>;

export type RelatedTicketsForDates = {
	datetimeIds: string[];
};
