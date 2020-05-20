import React from 'react';
import { is } from 'ramda';

import ColorSwatch from '@appDisplay/ColorSwatch';
import { Icon, IconName } from '@appDisplay/icons';
import { DescriptionList } from '@appLayout/descriptionList';
import { EntityListLegendProps } from './types';

const EntityListLegend: React.FC<EntityListLegendProps> = ({ legendConfig }) => {
	const { icons, swatches } = legendConfig;

	const iconsSource = icons.map(({ icon, description }) => {
		// @ts-ignore
		const term = (!is(String)(icon) && React.createElement(icon)) || (
			<Icon aria-label={description} name={icon as IconName} svgSize={18} />
		);

		return {
			className: 'ee-entity-list-legend-item',
			description,
			term,
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
