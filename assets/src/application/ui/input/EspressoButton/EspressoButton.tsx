import React from 'react';
import AntIcon from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';

import { EspressoButtonProps, EspressoButtonSize, EspressoButtonType, Icon } from './types';
import { EspressoIcon, isEspressoIcon, withLabel, withTooltip } from '../../display';

type ButtonType = React.ComponentType;

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const EspressoButton = React.forwardRef<ButtonType, EspressoButtonProps>(
	(
		{
			icon,
			onClick,
			buttonText,
			buttonSize = EspressoButtonSize.DEFAULT,
			buttonType = EspressoButtonType.DEFAULT,
			className: htmlClass,
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

		// check if icon prop is just an icon name (like "calendar") and if not, assume it is JSX
		if (isEspressoIcon(icon)) {
			// custom EE icon
			const svgSize = buttonText ? buttonSize : 20;
			const svgIcon = () => <EspressoIcon icon={icon as Icon} svgSize={svgSize} />;
			if (svgIcon) {
				return (
					<Button
						{...props}
						className={className}
						icon={<AntIcon component={svgIcon} />}
						onClick={onClick}
						tabIndex={0}
						ref={ref}
					>
						{buttonText && buttonText}
					</Button>
				);
			}
		}

		// AntD or JSX element icon
		return (
			<Button {...props} className={className} icon={icon} onClick={onClick} tabIndex={0} ref={ref}>
				{buttonText && buttonText}
			</Button>
		);
	}
);

export default withLabel<ButtonType, EspressoButtonProps>(withTooltip<ButtonType, EspressoButtonProps>(EspressoButton));
