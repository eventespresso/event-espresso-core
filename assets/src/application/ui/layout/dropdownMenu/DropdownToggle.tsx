import React from 'react';
import classNames from 'classnames';

import { More } from '@appDisplay/espressoIcons';
import { DropdownToggleProps } from './types';
import { IconButton } from '@chakra-ui/core';
import { MenuToggle } from '@infraUI/layout/menu';
import { Tooltip } from '@infraUI/display';

const DropdownToggle = React.forwardRef<typeof MenuToggle, DropdownToggleProps>(
	({ icon = More, isOpen, tooltip, ...toggleProps }, ref) => {
		const className = classNames('components-dropdown-menu__toggle', toggleProps.className, {
			'is-opened': isOpen,
		});

		return (
			//TODO: refactor this to take advantage of `withTooltip` when and if that will be based off chakra
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
