import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: Icon.EDIT, description: 'Edit Event Details' },
		{ icon: Icon.CALENDAR, description: 'View Assigned Dates' },
		{ icon: Icon.CALCULATOR, description: 'View Ticket Price Calculator' },
	],
	swatches: {
		DTT: 'Trashed',
		DTE: 'Expired',
		DTS: 'Sold Out',
		DTA: 'Active',
	},
};
