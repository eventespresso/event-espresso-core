import React from 'react';
import classNames from 'classnames';

import { Button as ButtonAdapter } from '@infraUI/inputs';
import { ButtonProps, ButtonSize, ButtonType } from './types';
import { withLabel, withTooltip } from '../../display';

type BtnType = React.ComponentType<ButtonProps>;

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const Button = React.forwardRef<typeof ButtonAdapter, ButtonProps>(
	(
		{
			buttonSize = ButtonSize.DEFAULT,
			buttonText,
			buttonType = ButtonType.DEFAULT,
			className: htmlClass,
			icon,
			onClick,
			...props
		},
		ref
	) => {
		const className = classNames({
			[htmlClass]: htmlClass,
			'esprs-button': true,
			'esprs-btn-accent': buttonType === ButtonType.ACCENT,
			'esprs-btn-default': buttonType === ButtonType.DEFAULT,
			'esprs-btn-primary': buttonType === ButtonType.PRIMARY,
			'esprs-btn-minimal': buttonType === ButtonType.MINIMAL,
			'esprs-btn-secondary': buttonType === ButtonType.SECONDARY,
			'esprs-btn-tiny': buttonSize === ButtonSize.TINY,
			'esprs-btn-small': buttonSize === ButtonSize.SMALL,
			'esprs-btn-big': buttonSize === ButtonSize.BIG,
			'esprs-btn-huge': buttonSize === ButtonSize.HUGE,
			'ant-btn-icon-only': !buttonText,
			'ee-noIcon': !icon,
		});

		return (
			<ButtonAdapter
				{...props}
				buttonText={buttonText}
				className={className}
				icon={icon}
				onClick={onClick}
				ref={ref}
				tabIndex={0}
			/>
		);
	}
);

// Since withLabel and withTooltip accept only a component type
// Lets cast it
export default withLabel(withTooltip(Button as BtnType) as BtnType);
