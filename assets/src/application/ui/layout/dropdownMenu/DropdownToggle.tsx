import React from 'react';
import classNames from 'classnames';

import { DropdownToggleProps } from './types';
import { MenuToggle } from '@infraUI/layout/menu';
import { EspressoIcon, Icon, withTooltip } from '@application/ui/display';
import { Button } from '@infraUI/inputs';

const DropdownToggle = React.forwardRef<typeof MenuToggle, DropdownToggleProps>(
	({ icon = Icon.MORE, isOpen, ...toggleProps }, ref) => {
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
				ref={ref}
			>
				<EspressoIcon icon={icon} />
			</MenuToggle>
		);
	}
);

export default withTooltip(DropdownToggle);
