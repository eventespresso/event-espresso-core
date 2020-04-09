import React from 'react';
import classNames from 'classnames';

import { DropdownToggleProps } from './types';
import { MenuToggle } from '@infraUI/layout/menu';
import { EspressoIcon, Icon } from '@application/ui/display';
import { Button } from '@infraUI/inputs';

const DropdownToggle: React.FC<DropdownToggleProps> = ({ icon = Icon.MORE, label, isOpen, ...toggleProps }) => {
	const className = classNames('components-dropdown-menu__toggle', toggleProps.className, {
		'is-opened': isOpen,
	});

	return (
		<MenuToggle
			as={Button}
			// @ts-ignore
			variant='ghost'
			{...toggleProps}
			className={className}
			title={label}
		>
			<EspressoIcon icon={icon} />
		</MenuToggle>
	);
};

export default DropdownToggle;
