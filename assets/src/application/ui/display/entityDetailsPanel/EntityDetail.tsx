import React from 'react';

import { EntityDetailProps } from './types';

const EntityDetail: React.FC<EntityDetailProps> = ({ render: Component, ...props }) => {
	if (Component) {
		return <Component {...props} />;
	}
	const { id, label, value, className = '' } = props;

	return (
		<div className={`ee-entity-details ${id}-div ${className}`}>
			<div className={`ee-entity-details__label ${id}-label`}>{label}</div>
			<div className={`ee-entity-details__value ${id}-value`}>{value}</div>
		</div>
	);
};

export default EntityDetail;
