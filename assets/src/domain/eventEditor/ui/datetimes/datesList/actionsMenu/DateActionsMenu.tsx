import React from 'react';

import { ActionsMenuComponentProps } from '@appLayout/entityActionsMenu';
import useDatesActionMenuItems from '../../hooks/useDatesActionMenuItems';
import { Datetime } from '@edtrServices/apollo/types';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({ entity, ...menuProps }) => {
	const menuItems = useDatesActionMenuItems(entity);

	return (
		<div className={`ee-entity-menu ee-datetime-menu`} {...menuProps}>
			{menuItems}
		</div>
	);
};

export default DateActionsMenu;
