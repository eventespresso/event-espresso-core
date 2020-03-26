import { DataProxy } from 'apollo-cache';
import { OperationVariables } from 'apollo-client';
import { Entity, EntityId } from '@appServices/apollo/types';
import { RelationEntity } from '@appServices/apollo/relations';

export type ReadQueryOptions<TVariables = OperationVariables> = DataProxy.Query<TVariables>;

export type WriteQueryOptions<TData = any, TVariables = OperationVariables> = DataProxy.WriteQueryOptions<
	TData,
	TVariables
>;

export interface EntityItemProps {
	id: EntityId;
}

export interface FetchEntitiesResult<Data> {
	data: Data;
	error: Error;
	loading: boolean;
}

export type EntityListName = 'Datetimes' | 'Tickets' | 'Prices' | 'PriceTypes';

export type RelatedEntitiesHook<E extends Entity, RE extends RelationEntity> = (args: {
	entity: Exclude<RelationEntity, RE>;
	entityId: EntityId;
}) => Array<E>;

export type RelatedTicketsForDates = {
	datetimeIds: string[];
};
