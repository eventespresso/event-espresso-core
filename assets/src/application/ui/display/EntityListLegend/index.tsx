import React from 'react';
import classNames from 'classnames';
import { Row, Col } from 'antd';

import { EspressoIcon, Icon } from '@appDisplay/espressoIcon';
import { LegendConfig } from './types';
import './style.scss';

interface Props {
	legendConfig: LegendConfig;
}

const EntityListLegend: React.FC<Props> = ({ legendConfig }) => {
	const { icons, swatches } = legendConfig;

	return (
		<Row className='ee-row'>
			<Col span={12}>
				<dl className='ee-list-table-legend'>
					{icons.map(({ icon, description }) => {
						return (
							<dt>
								<EspressoIcon aria-label={description} icon={icon as Icon} svgSize={18} />
								<span className='ee-legend-description'>{description}</span>
							</dt>
						);
					})}
				</dl>
			</Col>
			<Col span={12}>
				<dl className='ee-list-table-legend'>
					{Object.entries(swatches).map(([swatchClassName, description]) => {
						return (
							<dt>
								<span
									aria-label={description}
									className={classNames(
										'ee-status-legend',
										'ee-status-background-color-' + swatchClassName
									)}
								></span>
								<span className='ee-legend-description'>{description}</span>
							</dt>
						);
					})}
				</dl>
			</Col>
		</Row>
	);
};

export default EntityListLegend;
