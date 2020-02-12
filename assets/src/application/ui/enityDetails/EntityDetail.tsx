import React from 'react';

import { EntityDetailProps } from './types';

const EntityDetail: React.FC<EntityDetailProps> = ({ render: Component, ...props }) => {
	if (Component) {
		return <Component {...props} />;
	}
	const { id, label, value, htmlClass = '' } = props;
	return (
		<div className={`ee-entity-details-div ${id}-div ${htmlClass}`}>
			<div className={`ee-entity-details-label-div ${id}-label`}>{label}</div>
			<div className={`ee-entity-details-value-div ${id}-value`}>{value}</div>
		</div>
	);
};

export default EntityDetail;
