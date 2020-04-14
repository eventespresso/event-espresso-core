import { Icon } from '@appDisplay/espressoIcons';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { __ } from '@wordpress/i18n';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: Icon.EDIT, description: 'Edit Ticket Details' },
		{ icon: Icon.CALENDAR, description: 'Manage Date Assignments' },
		{ icon: Icon.CALCULATOR, description: 'Ticket Price Calculator' },
		{ icon: Icon.TRASH, description: 'Move Ticket to Trash' },
	],
	swatches: {
		TKA: __('Trashed'),
		TKE: __('Expired'),
		TKO: __('On Sale'),
		TKS: __('Sold Out'),
		TKP: __('Pending'),
	},
};
