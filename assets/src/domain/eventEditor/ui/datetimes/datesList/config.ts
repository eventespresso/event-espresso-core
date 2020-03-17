import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: Icon.EDIT, description: 'Edit Event Details' },
		{ icon: Icon.GROUPS, description: 'View Registrations for Event' },
		{ icon: Icon.TICKET, description: 'View Assigned Tickets' },
	],
	swatches: {
		DTT: 'Trashed',
		DTE: 'Expired',
		DTS: 'Sold Out',
		DTA: 'Active',
	},
};
