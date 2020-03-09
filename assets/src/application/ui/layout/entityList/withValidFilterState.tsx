import React from 'react';

import { EntityListFilterBar, EntityListFilterBarProps } from './filterBar';

const withValidFilterState = (FilterBarComponent: React.ReactType): React.FC<EntityListFilterBarProps> => ({
	filterState,
	...props
}) => {
	return filterState ? <FilterBarComponent filterState={filterState} {...props} /> : null;
};

export default withValidFilterState(EntityListFilterBar);
