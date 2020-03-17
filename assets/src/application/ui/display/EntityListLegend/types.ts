import { Icon } from '@appDisplay/espressoIcon';

type Icons = {
	[key in Icon]?: string;
};

export interface LegendConfig {
	icons: Icons;
	swatches: {
		[key: string]: string;
	};
}
