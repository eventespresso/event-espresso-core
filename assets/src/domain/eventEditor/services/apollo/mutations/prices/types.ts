import { EntityId } from '../../types';

interface PriceBaseInput {
	amount?: number | string;
	desc?: string;
	isDefault?: boolean;
	isTrashed?: boolean;
	name?: string;
	order?: number;
	overrides?: number;
	parent?: string;
	priceType?: string;
	wpUser?: number;
}

export type CreatePriceInput = PriceBaseInput;

export interface UpdatePriceInput extends PriceBaseInput {
	id?: EntityId;
}

export interface DeletePriceInput {
	id?: EntityId;
}
