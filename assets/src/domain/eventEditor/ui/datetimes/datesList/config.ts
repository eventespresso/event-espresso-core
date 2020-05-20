import { IconName } from '@appDisplay/icons';
import { Trash } from '@appDisplay/icons/svgs';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { __ } from '@wordpress/i18n';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: IconName.EDIT, description: 'Edit Event Date Details' },
		{ icon: IconName.GROUPS, description: 'View Registrations for this Date' },
		{ icon: IconName.TICKET, description: 'Manage Ticket Assignments' },
		{ icon: Trash, description: 'Move Date to Trash' },
	],
	swatches: {
		DTA: __('Active'),
		DTT: __('Trashed'),
		DTE: __('Expired'),
		DTS: __('Sold Out'),
		DTU: __('Upcoming'),
	},
};
