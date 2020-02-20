import React from 'react';
import classNames from 'classnames';

export enum EntityActionsMenuLayout {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

export interface EntityActionsMenuProps {
	className: string;
	layout: EntityActionsMenuLayout;
	menuItems: Array<React.ReactNode>;
	[key: string]: any;
}

const EntityActionsMenu: React.FC<EntityActionsMenuProps> = ({
	className,
	layout = EntityActionsMenuLayout.Horizontal,
	menuItems,
	...menuProps
}) => {
	className = classNames({
		[className]: className,
		'ee-entity-actions-menu': true,
		'ee-entity-actions-menu--horizontal': layout === EntityActionsMenuLayout.Horizontal,
		'ee-entity-actions-menu--vertical': layout === EntityActionsMenuLayout.Vertical,
	});
	return (
		<div className={className} {...menuProps}>
			{menuItems}
		</div>
	);
};

export default EntityActionsMenu;
