import React from 'react';
import classNames from 'classnames';

import { Button } from '@infraUI/inputs';
import { EspressoButtonProps, EspressoButtonSize, EspressoButtonType } from './types';
import { withLabel, withTooltip } from '../../display';

type ButtonType = React.ComponentType<EspressoButtonProps>;

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const EspressoButton = React.forwardRef<typeof Button, EspressoButtonProps>(
	(
		{
			buttonSize = EspressoButtonSize.DEFAULT,
			buttonText,
			buttonType = EspressoButtonType.DEFAULT,
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
			'esprs-btn-accent': buttonType === EspressoButtonType.ACCENT,
			'esprs-btn-default': buttonType === EspressoButtonType.DEFAULT,
			'esprs-btn-primary': buttonType === EspressoButtonType.PRIMARY,
			'esprs-btn-minimal': buttonType === EspressoButtonType.MINIMAL,
			'esprs-btn-secondary': buttonType === EspressoButtonType.SECONDARY,
			'esprs-btn-tiny': buttonSize === EspressoButtonSize.TINY,
			'esprs-btn-small': buttonSize === EspressoButtonSize.SMALL,
			'esprs-btn-big': buttonSize === EspressoButtonSize.BIG,
			'esprs-btn-huge': buttonSize === EspressoButtonSize.HUGE,
			'ant-btn-icon-only': !buttonText,
			'ee-noIcon': !icon,
		});

		return (
			<Button
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
export default withLabel(withTooltip(EspressoButton as ButtonType) as ButtonType);
