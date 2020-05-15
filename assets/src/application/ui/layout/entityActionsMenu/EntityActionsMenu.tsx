import React from 'react';
import classNames from 'classnames';

import './style.scss';

import { EntityActionsMenuProps, EntityActionsMenuLayout } from './types';

const EntityActionsMenu: React.FC<EntityActionsMenuProps> = ({
	layout = EntityActionsMenuLayout.Horizontal,
	menuItems,
	...props
}) => {
	const className = classNames(props.className, 'ee-entity-actions-menu', {
		'ee-entity-actions-menu--horizontal': layout === EntityActionsMenuLayout.Horizontal,
		'ee-entity-actions-menu--vertical': layout === EntityActionsMenuLayout.Vertical,
	});

	return (
		<div className={className} {...props}>
			{menuItems}
		</div>
	);
};

export default EntityActionsMenu;
