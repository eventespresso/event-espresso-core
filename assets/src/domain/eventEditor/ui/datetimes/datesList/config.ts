import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { __ } from '@wordpress/i18n';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: Icon.EDIT, description: 'Edit Event Details' },
		{ icon: Icon.GROUPS, description: 'View Registrations for Event' },
		{ icon: Icon.TICKET, description: 'View Assigned Tickets' },
	],
	swatches: {
		DTA: __('Active'),
		DTT: __('Trashed'),
		DTE: __('Expired'),
		DTS: __('Sold Out'),
		DTU: __('Upcoming'),
	},
};
