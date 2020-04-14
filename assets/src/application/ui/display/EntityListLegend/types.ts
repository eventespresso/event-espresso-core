import { AnyObject } from '@appServices/utilities/types';
import { IconName } from '@appDisplay/Icons';

export interface EntityListLegendProps {
	legendConfig: LegendConfig;
}

type IconType = {
	icon: IconName;
	description: string;
};

export interface LegendConfig {
	icons: IconType[];
	swatches: AnyObject;
}
