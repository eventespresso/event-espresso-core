import { EntityId } from '@dataServices/types';

export type RelationEntity = 'datetimes' | 'tickets' | 'prices' | 'priceTypes';

interface CommonProps<Entity extends RelationEntity> {
	relation?: Exclude<RelationEntity, Entity>;
	relationId?: EntityId;
	relationIds?: EntityId[];
}

export type PossibleRelation<ForEntity extends RelationEntity> = {
	[key in Exclude<RelationEntity, ForEntity>]?: EntityId[];
};

export type RelationalEntity<Entity extends RelationEntity> = {
	[key: string]: PossibleRelation<Entity>;
};

export type RelationalData = {
	[key in RelationEntity]?: RelationalEntity<null>;
};

export interface RelationFunctionProps<Entity extends RelationEntity> extends CommonProps<Entity> {
	entity: Entity;
	entityId: EntityId;
}

export interface RelationAction extends CommonProps<null> {
	type: 'INITIALIZE' | 'ADD_RELATION' | 'REMOVE_RELATION' | 'UPDATE_RELATIONS' | 'DROP_RELATIONS';
	entity?: RelationEntity;
	entityId?: EntityId;
	data?: RelationalData;
}

export interface RelationsManager {
	initialize: (data: RelationalData) => void;
	isInitialized: () => boolean;
	getData: () => RelationalData;
	getRelations: <ForEntity extends RelationEntity>(options: RelationFunctionProps<ForEntity>) => EntityId[];
	addRelation: <ForEntity extends RelationEntity>(options: RelationFunctionProps<ForEntity>) => void;
	updateRelations: <ForEntity extends RelationEntity>(options: RelationFunctionProps<ForEntity>) => void;
	removeRelation: <ForEntity extends RelationEntity>(options: RelationFunctionProps<ForEntity>) => void;
	dropRelations: <ForEntity extends RelationEntity>(options: RelationFunctionProps<ForEntity>) => void;
}

export type RelationsReducer = (state: RelationalData, action: RelationAction) => RelationalData;
