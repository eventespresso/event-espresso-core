import { DisplayDates } from '@edtrInterfaces/types';
import { ShowDates } from '@edtrInterfaces/datetimes/types';
import { Entity } from '@appServices/apollo/types';

export interface TableViewProps {
	className?: string;
	displayDates: DisplayDates;
	entities: Entity[];
	showDate: ShowDates;
}
