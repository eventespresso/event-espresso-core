import { IconName } from '@appDisplay/icons';
import { Trash } from '@appDisplay/icons/svgs';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { __ } from '@wordpress/i18n';

export const legendConfig: LegendConfig = {
	icons: [
		{ icon: IconName.EDIT, description: 'Edit Ticket Details' },
		{ icon: IconName.CALENDAR, description: 'Manage Date Assignments' },
		{ icon: IconName.CALCULATOR, description: 'Ticket Price Calculator' },
		{ icon: Trash, description: 'Move Ticket to Trash' },
	],
	swatches: {
		TKA: __('Trashed'),
		TKE: __('Expired'),
		TKO: __('On Sale'),
		TKS: __('Sold Out'),
		TKP: __('Pending'),
	},
};
