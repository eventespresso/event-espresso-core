import React from 'react';
import classNames from 'classnames';
import { Button, Tooltip } from 'antd';
import Icon from '@ant-design/icons';

import { EspressoButtonProps, EspressoButtonSize, EspressoButtonType } from './types';
import { EspressoIcon, isEspressoIcon } from '../../display';

/**
 * Button wrapper for adding styles
 */
const EspressoButton: React.FC<EspressoButtonProps> = ({
	icon,
	onClick,
	tooltip,
	className,
	buttonText,
	size = EspressoButtonSize.DEFAULT,
	buttonType = EspressoButtonType.DEFAULT,
	tooltipProps = {},
	...buttonProps
}) => {
	className = classNames({
		[className]: className,
		'esprs-button': true,
		'esprs-btn-accent': buttonType === EspressoButtonType.ACCENT,
		'esprs-btn-default': buttonType === EspressoButtonType.DEFAULT,
		'esprs-btn-primary': buttonType === EspressoButtonType.PRIMARY,
		'esprs-btn-secondary': buttonType === EspressoButtonType.SECONDARY,
		'esprs-btn-tiny': size === EspressoButtonSize.TINY,
		'esprs-btn-small': size === EspressoButtonSize.SMALL,
		'esprs-btn-big': size === EspressoButtonSize.BIG,
		'esprs-btn-huge': size === EspressoButtonSize.HUGE,
		'ant-btn-icon-only': !buttonText,
		'ee-noIcon': !icon,
	});
	let eeButton: JSX.Element;
	// check if icon prop is just an icon name (like "calendar") and if not, assume it is JSX
	if (typeof icon === 'string' && isEspressoIcon(icon)) {
		// custom EE icon
		const svgSize = buttonText ? size : 20;
		const svgIcon = () => <EspressoIcon icon={icon} svgSize={svgSize} />;
		if (svgIcon) {
			eeButton = (
				<Button {...buttonProps} onClick={onClick} className={className}>
					{buttonText && buttonText}
					<Icon component={svgIcon} />
				</Button>
			);
		}
	} else {
		// AntD or JSX element icon
		eeButton = (
			<Button {...buttonProps} onClick={onClick} className={className}>
				{icon}
				{buttonText && buttonText}
			</Button>
		);
	}
	return tooltip ? (
		<Tooltip title={tooltip} {...tooltipProps}>
			{eeButton}
		</Tooltip>
	) : (
		eeButton
	);
};

export default EspressoButton;
