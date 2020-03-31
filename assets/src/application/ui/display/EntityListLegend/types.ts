import { AnyObject } from '@appServices/utilities/types';
import { Icon } from '@appDisplay/espressoIcon';

export interface EntityListLegendProps {
	legendConfig: LegendConfig;
}

type IconType = {
	icon: Icon;
	description: string;
};

export interface LegendConfig {
	icons: IconType[];
	swatches: AnyObject;
}
