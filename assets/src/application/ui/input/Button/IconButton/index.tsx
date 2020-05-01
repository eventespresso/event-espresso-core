import React from 'react';
import classNames from 'classnames';

import { IconButton as IconButtonAdapter } from '@infraUI/inputs';
import { IconButtonProps } from './types';
import { withLabel, withTooltip } from '../../../display';

import './style.scss';

type BtnType = React.ComponentType<IconButtonProps>;

const IconButton = React.forwardRef<typeof IconButtonAdapter, IconButtonProps>(
	({ borderless, color, icon, onClick, ...props }, ref) => {
		const className = classNames(
			'ee-btn-base ee-icon-button',
			color && `ee-icon-button-color--${color}`,
			{
				'ee-icon-button--borderless': borderless,
			},
			props.className
		);

		return (
			<IconButtonAdapter
				aria-label={props['aria-label']}
				className={className}
				icon={icon}
				onClick={onClick}
				tabIndex={0}
				ref={ref}
			/>
		);
	}
);

export default withLabel(withTooltip(IconButton as BtnType) as BtnType);
