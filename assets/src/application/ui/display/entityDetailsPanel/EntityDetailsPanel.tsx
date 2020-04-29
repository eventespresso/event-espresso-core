import React, { Fragment } from 'react';
import classNames from 'classnames';

import './style.scss';
import DetailsSeparator from './DetailsSeparator';
import EntityDetail from './EntityDetail';
import { EntityDetailsPanelProps } from './types';

const EntityDetailsPanel: React.FC<EntityDetailsPanelProps> = ({ details, ...props }) => {
	const className = classNames('ee-entity-details-panel-div', props.className);

	return (
		<div className={className}>
			{details.map((detail, index) => {
				return (
					<Fragment key={index}>
						<EntityDetail {...detail} />
						<DetailsSeparator last={index === details.length - 1} />
					</Fragment>
				);
			})}
		</div>
	);
};

export default EntityDetailsPanel;
