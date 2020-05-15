import React from 'react';
import classNames from 'classnames';

import { More } from '@appDisplay/icons';
import { DropdownToggleProps } from '../types';
import { IconButton } from '@application/ui/input';
import { MenuToggle } from '@infraUI/layout/menu';
import { withTooltip } from '../../../display';

import './style.scss';

const DropdownToggle = React.forwardRef<typeof MenuToggle, DropdownToggleProps>(
	({ icon = More, isOpen, ...toggleProps }, ref) => {
		const className = classNames(
			toggleProps.className,
			'ee-dropdown-menu__toggle',
			isOpen && 'ee-dropdown-menu__toggle--open',
		);

		return (
			<MenuToggle
				as={ IconButton }
				// @ts-ignore
				icon={ More }
				{ ...toggleProps }
				className={ className }
				ref={ ref }
			/>
		);
	}
);

export default withTooltip(DropdownToggle);
