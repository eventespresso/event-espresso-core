import { AnyObject } from '@appServices/utilities/types';
import { Icon } from '@appDisplay/espressoIcon';

type IconType = {
	icon: Icon;
	description: string;
};

export interface LegendConfig {
	icons: IconType[];
	swatches: AnyObject;
}
