import React, { Fragment } from 'react';
import classNames from 'classnames';

import './style.css';
import DetailsSeparator from './DetailsSeparator';
import EntityDetail from './EntityDetail';
import { EntityDetailsPanelProps } from './types';

const EntityDetailsPanel: React.FC<EntityDetailsPanelProps> = ({ details, className }) => {
	const htmlClass = classNames(className, 'ee-entity-details-panel-div');
	return (
		<div className={htmlClass}>
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
