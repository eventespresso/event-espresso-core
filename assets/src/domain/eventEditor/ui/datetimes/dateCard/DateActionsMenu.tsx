import React, { CSSProperties } from 'react';

import { useEntityActionMenuItems, ActionsMenuComponentProps } from '../../entityActionMenu';
import { Datetime } from '../../../services/apollo/types';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({ entity, position, layout }) => {
	const menuItems = useEntityActionMenuItems('datetime', entity);

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

	return <div style={style}>{menuItems}</div>;
};

export default DateActionsMenu;
