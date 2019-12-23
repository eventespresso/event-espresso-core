import { EntityId } from '../../../../domain/eventEditor/data/types';

interface CommonProps {
	relation?: string;
	relationId?: string;
	relationIds?: string[];
}

export interface RelationFunctionProps extends CommonProps {
	entity: string;
	entityId: EntityId;
}

export interface RelationAction extends CommonProps {
	type: string;
	entity?: string;
	entityId?: EntityId;
	data?: any;
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

export interface RelationsManager {
	setData: (data: RelationalData) => void;
	getRelations: (options: RelationFunctionProps) => string[];
	addRelation: (options: RelationFunctionProps) => void;
	updateRelations: (options: RelationFunctionProps) => void;
	removeRelation: (options: RelationFunctionProps) => void;
	dropRelations: (options: RelationFunctionProps) => void;
}
