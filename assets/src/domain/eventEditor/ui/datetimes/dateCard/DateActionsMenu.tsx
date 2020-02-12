import React, { CSSProperties } from 'react';

import { ActionsMenuComponentProps } from '../../entityActionMenu';
import useDatesActionMenuItems from '../hooks/useDatesActionMenuItems';
import { Datetime } from '../../../services/apollo/types';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({
	entity,
	position,
	layout = 'horizontal',
}) => {
	const menuItems = useDatesActionMenuItems(entity);

	const style: CSSProperties = {
		position: 'absolute',
		right: '.5rem',
		textAlign: 'right',
		flexDirection: layout === 'vertical' ? 'column' : 'row',
		zIndex: 1,
		...(position === 'top' && {
			top: '.5rem',
		}),
	};

	return (
		<div className={`ee-entity-menu ee-datetime-menu ee-entity-menu-${layout}`} style={style}>
			{menuItems}
		</div>
	);
};

export default DateActionsMenu;
