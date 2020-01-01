import { EntityId } from '../../../../domain/eventEditor/data/types';

type RelationEntity = 'datetimes' | 'tickets' | 'prices' | 'priceTypes';

interface CommonProps {
	relation?: RelationEntity;
	relationId?: EntityId;
	relationIds?: EntityId[];
}

type PossibleRelation = {
	datetimes?: EntityId[];
	tickets?: EntityId[];
	prices?: EntityId[];
	priceTypes?: EntityId[];
};

type RelationalEntity = {
	[key: string]: PossibleRelation;
};

export type RelationalData = {
	datetimes?: RelationalEntity;
	tickets?: RelationalEntity;
	prices?: RelationalEntity;
	priceTypes?: RelationalEntity;
};

export interface RelationFunctionProps extends CommonProps {
	entity: RelationEntity;
	entityId: EntityId;
}

export interface RelationAction extends CommonProps {
	type: 'SET_DATA' | 'ADD_RELATION' | 'REMOVE_RELATION' | 'UPDATE_RELATIONS' | 'DROP_RELATIONS';
	entity?: RelationEntity;
	entityId?: EntityId;
	data?: RelationalData;
}

export interface RelationsManager {
	setData: (data: RelationalData) => void;
	getRelations: (options: RelationFunctionProps) => EntityId[];
	addRelation: (options: RelationFunctionProps) => void;
	updateRelations: (options: RelationFunctionProps) => void;
	removeRelation: (options: RelationFunctionProps) => void;
	dropRelations: (options: RelationFunctionProps) => void;
}
