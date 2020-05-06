import { DisplayStartOrEndDate } from '@sharedServices/filterState';
import { Entity } from '@dataServices/types';

export interface TableViewProps {
	className?: string;
	displayStartOrEndDate: DisplayStartOrEndDate;
	entities: Entity[];
}
