import { Icon, SvgPath } from '@appDisplay/espressoIcon';

type Icons = {
	[key in Icon]?: string;
};

export interface LegendConfig {
	icons: Icons;
	swatches: {
		[key: string]: string;
	};
}

export const legendConfig: LegendConfig = {
	icons: {
		[Icon.EDIT]: 'Edit Event Details',
	},
	swatches: {
		DTS: 'Sold Out',
	},
};
