import { DisplayDates } from '@edtrInterfaces/shared/types';
import { Entity } from '@appServices/apollo/types';

export interface TableViewProps {
	className?: string;
	displayDates: DisplayDates;
	entities: Entity[];
}
