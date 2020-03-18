import React from 'react';

import ColorSwatch from '@appDisplay/ColorSwatch';
import { EspressoIcon, Icon } from '@appDisplay/espressoIcon';
import { DescriptionList } from '@appLayout/descriptionList';
import { LegendConfig } from './types';
import './style.scss';

interface Props {
	legendConfig: LegendConfig;
}

const EntityListLegend: React.FC<Props> = ({ legendConfig }) => {
	const { icons, swatches } = legendConfig;
	const iconsSource = icons.map(({ icon, description }) => {
		return {
			term: <EspressoIcon aria-label={description} icon={icon as Icon} svgSize={18} />,
			description: <span className='ee-legend-description'>{description}</span>,
		};
	});

	const swatchesSource = Object.entries(swatches).map(([swatchClassName, description]) => {
		const colorSwatchClassName = 'ee-status-background-color-' + swatchClassName;

		return {
			term: <ColorSwatch className={colorSwatchClassName} label={description} />,
			description: <span className='ee-legend-description'>{description}</span>,
		};
	});

	const dataSource = [...iconsSource, ...swatchesSource];

	return <DescriptionList dataSource={dataSource} />;
};

export default EntityListLegend;
