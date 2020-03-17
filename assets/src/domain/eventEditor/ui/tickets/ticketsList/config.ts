import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';

export const legendConfig: LegendConfig = {
	icons: {
		[Icon.EDIT]: 'Edit Event Details',
		[Icon.CALENDAR]: 'View Assigned Dates',
		[Icon.CALCULATOR]: 'View Ticket Price Calculator',
	},
	swatches: {
		DTT: 'Trashed',
		DTE: 'Expired',
		DTS: 'Sold Out',
		DTA: 'Active',
	},
};
