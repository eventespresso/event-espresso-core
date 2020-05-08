import { EntityId } from '@dataServices/types';

export interface PriceBaseInput {
	amount?: number;
	description?: string;
	isDefault?: boolean;
	isTrashed?: boolean;
	name?: string;
	order?: number;
	overrides?: number;
	parent?: string;
	priceType?: string;
	wpUser?: number;
}

export interface CreatePriceInput extends PriceBaseInput {
	priceType: string; // required for create mutation
}

export interface UpdatePriceInput extends PriceBaseInput {
	id?: EntityId;
}

export interface DeletePriceInput {
	id?: EntityId;
	deletePermanently?: boolean;
}
