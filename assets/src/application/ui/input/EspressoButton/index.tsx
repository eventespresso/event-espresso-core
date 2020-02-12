import React from 'react';
import classNames from 'classnames';
import { Button, Icon } from 'antd';

import { EspressoButtonProps, EspressoButtonSize, EspressoButtonType } from './types';
import { EspressoIcon, isEspressoIcon } from '../../display';

/**
 * Button wrapper for adding styles
 */
const EspressoButton: React.FC<EspressoButtonProps> = ({
	buttonText,
	icon,
	onClick,
	size = EspressoButtonSize.DEFAULT,
	btnType = EspressoButtonType.DEFAULT,
	htmlClass,
	...buttonProps
}) => {
	let classes = classNames({
		[htmlClass]: htmlClass,
		'esprs-btn-accent': btnType === EspressoButtonType.ACCENT,
		'esprs-btn-default': btnType === EspressoButtonType.DEFAULT,
		'esprs-btn-primary': btnType === EspressoButtonType.PRIMARY,
		'esprs-btn-secondary': btnType === EspressoButtonType.SECONDARY,
		'esprs-btn-tiny': size === EspressoButtonSize.TINY,
		'esprs-btn-small': size === EspressoButtonSize.SMALL,
		'esprs-btn-big': size === EspressoButtonSize.BIG,
		'esprs-btn-huge': size === EspressoButtonSize.HUGE,
		'ee-noIcon': !icon,
	});
	let renderedIcon = null;
	if (isEspressoIcon(icon)) {
		const svgSize = buttonText ? size : 16;
		renderedIcon = () => <EspressoIcon icon={icon} svgSize={svgSize} />;
		if (renderedIcon) {
			classes += buttonText ? 'esprs-button' : ' ant-btn-icon-only';
			return (
				<Button {...buttonProps} onClick={onClick} className={classes}>
					{buttonText && buttonText}
					<Icon component={renderedIcon} />
				</Button>
			);
		}
		return null;
	}

	return (
		<Button {...buttonProps} icon={icon} onClick={onClick} className={classes}>
			{buttonText && buttonText}
		</Button>
	);
};

export default EspressoButton;
