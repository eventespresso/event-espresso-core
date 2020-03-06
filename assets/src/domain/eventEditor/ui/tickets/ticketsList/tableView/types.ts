import { DisplayDates } from '@edtrInterfaces/shared/types';
import { Entity } from '@appServices/apollo/types';
import { ShowDates } from '@edtrInterfaces/datetimes/types';

export interface TableViewProps {
	className?: string;
	displayDates: DisplayDates;
	entities: Entity[];
	showDate: ShowDates;
}
