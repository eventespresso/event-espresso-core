import React from 'react';
import classNames from 'classnames';

import { More } from '@appDisplay/icons';
import { DropdownToggleProps } from './types';
import { IconButton } from '@infraUI/inputs';
import { MenuToggle } from '@infraUI/layout/menu';
import { Tooltip } from '@infraUI/display';

const DropdownToggle = React.forwardRef<typeof MenuToggle, DropdownToggleProps>(
	({ icon = More, isOpen, tooltip, ...toggleProps }, ref) => {
		const className = classNames('ee-dropdown-menu__toggle', toggleProps.className, {
			'ee-dropdown-menu__toggle--open': isOpen,
		});

		return (
			<Tooltip title={tooltip}>
				<MenuToggle
					as={IconButton}
					// @ts-ignore
					icon={More}
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
