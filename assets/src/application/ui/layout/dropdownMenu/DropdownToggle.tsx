import React from 'react';
import classNames from 'classnames';

import { DropdownToggleProps } from './types';
import { EspressoIcon, Icon } from '@application/ui/display';
import { IconButton } from '@chakra-ui/core';
import { MenuToggle } from '@infraUI/layout/menu';
import { Tooltip } from '@infraUI/display';

const DropdownToggle = React.forwardRef<typeof MenuToggle, DropdownToggleProps>(
	({ icon = Icon.MORE, isOpen, tooltip, ...toggleProps }, ref) => {
		const className = classNames('components-dropdown-menu__toggle', toggleProps.className, {
			'is-opened': isOpen,
		});

		return (
			<Tooltip title={tooltip}>
				<MenuToggle
					as={IconButton}
					// @ts-ignore
					icon={() => <EspressoIcon icon={icon} />}
					variant='ghost'
					{...toggleProps}
					className={className}
					ref={ref}
				/>
			</Tooltip>
		);
	}
);

export default DropdownToggle;
