import { Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { __ } from '@wordpress/i18n';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: Icon.EDIT, description: 'Edit Event Date Details' },
		{ icon: Icon.GROUPS, description: 'View Registrations for this Date' },
		{ icon: Icon.TICKET, description: 'Manage Ticket Assignments' },
		{ icon: Icon.TRASH, description: 'Move Date to Trash' },
	],
	swatches: {
		DTA: __('Active'),
		DTT: __('Trashed'),
		DTE: __('Expired'),
		DTS: __('Sold Out'),
		DTU: __('Upcoming'),
	},
};
