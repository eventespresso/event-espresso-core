import React from 'react';

import { ActionsMenuComponentProps } from '../../entityActionMenu';
import useDatesActionMenuItems from '../hooks/useDatesActionMenuItems';
import { Datetime } from '../../../services/apollo/types';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({ entity, menuItemProps, ...menuProps }) => {
	const menuItems = useDatesActionMenuItems(entity, menuItemProps);

	return (
		<div className={`ee-entity-menu ee-datetime-menu`} {...menuProps}>
			{menuItems}
		</div>
	);
};

export default DateActionsMenu;
