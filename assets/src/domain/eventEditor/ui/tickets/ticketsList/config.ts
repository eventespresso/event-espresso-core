import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { __ } from '@wordpress/i18n';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: Icon.EDIT, description: 'Edit Event Details' },
		{ icon: Icon.CALENDAR, description: 'View Assigned Dates' },
		{ icon: Icon.CALCULATOR, description: 'View Ticket Price Calculator' },
	],
	swatches: {
		TKA: __('Trashed'),
		TKE: __('Expired'),
		TKO: __('On Sale'),
		TKS: __('Sold Out'),
		TKP: __('Pending'),
	},
};
