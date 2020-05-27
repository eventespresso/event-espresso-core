import { EntityId } from '@dataServices/types';
import { Price } from '@edtrServices/apollo/types';

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

export interface PriceCommonInput extends PriceBaseInput, DeletePriceInput {}

export type PriceMutationResult = {
	espressoPrice: Price;
};

export type CreatePriceResult = {
	createEspressoPrice: PriceMutationResult;
};

export type UpdatePriceResult = {
	updateEspressoPrice: PriceMutationResult;
};

export type DeletePriceResult = {
	deleteEspressoPrice: PriceMutationResult;
};
