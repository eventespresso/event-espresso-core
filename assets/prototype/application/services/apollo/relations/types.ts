import { EspressoDatetime, EspressoPrice, EspressoPriceType, EspressoTicket } from '../../../generated/types';

interface CommonProps {
	relation?: string;
	relationId?: string;
	relationIds?: string[];
}

export interface RelationFunctionProps extends CommonProps {
	entity: string;
	entityId: string;
}

export interface RelationAction extends CommonProps {
	type: string;
	entity?: string;
	entityId?: string;
	data?: any;
}

interface Entity {
	id: string;
	dbid: number;
}

interface DatetimeProps extends Entity, EspressoDatetime {}
interface PriceProps extends Entity, EspressoPrice {}
interface PriceTypeProps extends Entity, EspressoPriceType {}
interface TicketProps extends Entity, EspressoTicket {}

type PossibleRelation = {
	datetimes?: string[];
	tickets?: string[];
	prices?: string[];
	priceTypes?: string[];
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
