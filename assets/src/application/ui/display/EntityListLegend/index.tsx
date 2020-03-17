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
					{Object.entries(icons).map(([icon, text]) => {
						return (
							<dt>
								<EspressoIcon icon={icon} svgSize={18} />
								<span className='ee-legend-description'>{text}</span>
							</dt>
						);
					})}
				</dl>
			</Col>
			<Col span={12}>
				<dl className='ee-list-table-legend'>
					{Object.entries(swatches).map(([swatchClassName, text]) => {
						return (
							<dt>
								<span
									className={classNames(
										'ee-status-legend',
										'ee-status-background-color-' + swatchClassName
									)}
								></span>
								<span className='ee-legend-description'>{text}</span>
							</dt>
						);
					})}
				</dl>
			</Col>
		</Row>
	);
};

export default EntityListLegend;
