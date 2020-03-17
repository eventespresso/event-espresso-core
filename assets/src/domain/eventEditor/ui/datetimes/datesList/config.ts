import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';

export const legendConfig: LegendConfig = {
	icons: {
		[Icon.EDIT]: 'Edit Event Details',
		[Icon.GROUPS]: 'View Registrations for Event',
		[Icon.TICKET]: 'View Assigned Tickets',
	},
	swatches: {
		DTT: 'Trashed',
		DTE: 'Expired',
		DTS: 'Sold Out',
		DTA: 'Active',
	},
};
