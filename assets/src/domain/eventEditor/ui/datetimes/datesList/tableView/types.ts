import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { Entity } from '@appServices/apollo/types';

export interface TableViewProps {
	className?: string;
	displayStartOrEndDate: DisplayStartOrEndDate;
	entities: Entity[];
}
