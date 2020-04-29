import React from 'react';
import classNames from 'classnames';

import './style.scss';

export enum EntityActionsMenuLayout {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

export interface EntityActionsMenuProps {
	className?: string;
	layout?: EntityActionsMenuLayout;
	menuItems: Array<React.ReactNode>;
}

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
