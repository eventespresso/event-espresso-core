import React from 'react';
import classNames from 'classnames';

import { Button as ButtonAdapter } from '@infraUI/inputs';
import { ButtonProps, ButtonSize, ButtonType } from './types';
import { withLabel, withTooltip } from '../../display';

import './style.scss';

type BtnType = React.ComponentType<ButtonProps>;

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const Button = React.forwardRef<typeof ButtonAdapter, ButtonProps>(
	(
		{ buttonSize = ButtonSize.DEFAULT, buttonText, buttonType = ButtonType.DEFAULT, icon, onClick, ...props },
		ref
	) => {
		const className = classNames(props.className, {
			[`ee-btn--${buttonType}`]: buttonType !== ButtonType.DEFAULT,
			[`ee-btn--${buttonSize}`]: buttonSize !== ButtonSize.DEFAULT,
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
