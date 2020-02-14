import { EntityId } from '../../types';

interface DatetimeBaseInput {
	capacity?: number;
	description?: string;
	endDate?: string;
	event?: EntityId;
	eventId?: number;
	isPrimary?: boolean;
	isSoldOut?: boolean;
	isTrashed?: boolean;
	length?: number;
	name?: string;
	order?: number;
	parent?: string;
	reserved?: number;
	sold?: number;
	startDate?: string;
	tickets?: Array<EntityId>;
}

export type CreateDatetimeInput = DatetimeBaseInput;

export interface UpdateDatetimeInput extends DatetimeBaseInput {
	id?: EntityId;
}

export interface DeleteDatetimeInput {
	id?: EntityId;
}
