import { AnyObject } from '@appServices/utilities/types';
import { IconName } from '@appDisplay/icons';

export interface EntityListLegendProps {
	legendConfig: LegendConfig;
}

interface IconType {
	icon: IconName | React.ReactNode;
	description: string;
}

export interface LegendConfig {
	icons: IconType[];
	swatches: AnyObject;
}
