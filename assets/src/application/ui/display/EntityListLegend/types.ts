import { Icon } from '@appDisplay/espressoIcon';

type IconType = {
	icon: Icon;
	description: string;
};

export interface LegendConfig {
	icons: IconType[];
	swatches: {
		[key: string]: string;
	};
}
