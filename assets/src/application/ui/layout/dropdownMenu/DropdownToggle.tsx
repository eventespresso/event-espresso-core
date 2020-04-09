import React from 'react';
import classNames from 'classnames';

import { DropdownToggleProps } from './types';
import { MenuToggle } from '@infraUI/layout/menu';
import { EspressoIcon, Icon, withTooltip } from '@application/ui/display';
import { IconButton } from '@chakra-ui/core';

const DropdownToggle = React.forwardRef<typeof MenuToggle, DropdownToggleProps>(
	({ icon = Icon.MORE, isOpen, ...toggleProps }, ref) => {
		const className = classNames('components-dropdown-menu__toggle', toggleProps.className, {
			'is-opened': isOpen,
		});

		return (
			<MenuToggle
				as={IconButton}
				// @ts-ignore
				icon={() => <EspressoIcon icon={icon} />}
				variant='ghost'
				{...toggleProps}
				className={className}
				ref={ref}
			/>
		);
	}
);

export default withTooltip(DropdownToggle);
