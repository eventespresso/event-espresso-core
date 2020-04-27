import { EntityId } from '@appServices/apollo/types';

export interface DatetimeBaseInput {
	capacity?: number;
	description?: string;
	endDate?: string | Date;
	event?: EntityId;
	eventId?: number;
	isPrimary?: boolean;
	isTrashed?: boolean;
	name?: string;
	order?: number;
	parent?: string;
	reserved?: number;
	sold?: number;
	startDate?: string | Date;
	tickets?: Array<EntityId>;
}

export type CreateDatetimeInput = DatetimeBaseInput;

export interface UpdateDatetimeInput extends DatetimeBaseInput {
	id?: EntityId;
}

export interface DeleteDatetimeInput {
	id?: EntityId;
	deletePermanently?: boolean;
}
