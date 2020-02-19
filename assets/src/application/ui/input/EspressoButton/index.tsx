import React from 'react';
import classNames from 'classnames';
import { Button, Icon, Tooltip } from 'antd';

import { EspressoButtonProps, EspressoButtonSize, EspressoButtonType } from './types';
import { EspressoIcon, isEspressoIcon } from '../../display';

/**
 * Button wrapper for adding styles
 */
const EspressoButton: React.FC<EspressoButtonProps> = ({
	icon,
	onClick,
	tooltip,
	htmlClass,
	buttonText,
	size = EspressoButtonSize.DEFAULT,
	buttonType = EspressoButtonType.DEFAULT,
	tooltipProps = {},
	...buttonProps
}) => {
	let classes = classNames({
		[htmlClass]: htmlClass,
		'esprs-button': true,
		'esprs-btn-accent': buttonType === EspressoButtonType.ACCENT,
		'esprs-btn-default': buttonType === EspressoButtonType.DEFAULT,
		'esprs-btn-primary': buttonType === EspressoButtonType.PRIMARY,
		'esprs-btn-secondary': buttonType === EspressoButtonType.SECONDARY,
		'esprs-btn-tiny': size === EspressoButtonSize.TINY,
		'esprs-btn-small': size === EspressoButtonSize.SMALL,
		'esprs-btn-big': size === EspressoButtonSize.BIG,
		'esprs-btn-huge': size === EspressoButtonSize.HUGE,
		'ee-noIcon': !icon,
	});
	let eeButton: JSX.Element;
	// check if icon prop is just an icon name (like "calendar") and if not, assume it is JSX
	if (typeof icon === 'string') {
		// custom EE icon
		if (isEspressoIcon(icon)) {
			const svgSize = buttonText ? size : 16;
			const renderedIcon = () => <EspressoIcon icon={icon} svgSize={svgSize} />;
			if (renderedIcon) {
				classes += buttonText ? '' : ' ant-btn-icon-only';
				eeButton = (
					<Button {...buttonProps} onClick={onClick} className={classes}>
						{buttonText && buttonText}
						<Icon component={renderedIcon} />
					</Button>
				);
			}
		} else {
			// AntD icon
			eeButton = (
				<Button {...buttonProps} icon={icon} onClick={onClick} className={classes}>
					{buttonText && buttonText}
				</Button>
			);
		}
	} else {
		// JSX element icon
		classes += buttonText ? '' : ' ant-btn-icon-only';
		eeButton = (
			<Button {...buttonProps} onClick={onClick} className={classes}>
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
