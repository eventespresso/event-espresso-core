import React from 'react';

import { EntityListFilterBar, EntityListFilterBarProps } from './filterBar';
import { EntityListFilterStateManager as ELFSM } from './filterBar/filterState';

const withValidFilterState = <FS extends ELFSM>(
	FilterBarComponent: React.ComponentType<EntityListFilterBarProps<FS>>
): React.FC<EntityListFilterBarProps<FS>> => ({ filterState, ...props }) => {
	return filterState ? <FilterBarComponent filterState={filterState} {...props} /> : null;
};

export default withValidFilterState(EntityListFilterBar);
