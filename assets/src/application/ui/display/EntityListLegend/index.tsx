import React from 'react';

import ColorSwatch from '@appDisplay/ColorSwatch';
import { EspressoIcon, Icon } from '@appDisplay/espressoIcons';
import { DescriptionList } from '@appLayout/descriptionList';
import { EntityListLegendProps } from './types';

const EntityListLegend: React.FC<EntityListLegendProps> = ({ legendConfig }) => {
	const { icons, swatches } = legendConfig;

	const iconsSource = icons.map(({ icon, description }) => {
		return {
			className: 'ee-entity-list-legend-item',
			description,
			term: <EspressoIcon aria-label={description} name={icon as Icon} svgSize={18} />,
		};
	});

	const swatchesSource = Object.entries(swatches).map(([swatchClassName, description]) => {
		const colorSwatchClassName = 'ee-status-background-color-' + swatchClassName;
		return {
			className: 'ee-entity-list-legend-item',
			description,
			term: <ColorSwatch className={colorSwatchClassName} label={description} />,
		};
	});

	const dataSource = [...iconsSource, ...swatchesSource];

	return <DescriptionList dataSource={dataSource} />;
};

export default EntityListLegend;
