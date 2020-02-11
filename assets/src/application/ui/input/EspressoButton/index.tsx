import React from 'react';
import classNames from 'classnames';
import { Button, Icon } from 'antd';

import { EspressoButtonProps, EspressoButtonSize, EspressoButtonStyle } from './types';
import { EspressoIcon, isEspressoIcon } from '../../display';

/**
 * Button wrapper for adding styles
 */
const EspressoButton: React.FC<EspressoButtonProps> = ({
	buttonText,
	icon,
	onClick,
	size,
	style,
	htmlClass,
	...buttonProps
}) => {
	let classes = classNames({
		[htmlClass]: htmlClass,
		'esprs-button': true,
		'esprs-btn-accent': style === EspressoButtonStyle.ACCENT,
		'esprs-btn-default': style === EspressoButtonStyle.DEFAULT,
		'esprs-btn-primary': style === EspressoButtonStyle.PRIMARY,
		'esprs-btn-secondary': style === EspressoButtonStyle.SECONDARY,
		'esprs-btn-tiny': size === EspressoButtonSize.TINY,
		'esprs-btn-small': size === EspressoButtonSize.SMALL,
		'esprs-btn-big': size === EspressoButtonSize.BIG,
		'esprs-btn-huge': size === EspressoButtonSize.HUGE,
	});
	let renderedIcon = null;

	if (isEspressoIcon(icon)) {
		renderedIcon = () => <EspressoIcon icon={icon} svgSize={size} />;
	} else {
		classes += ' ee-noIcon';
	}

	if (renderedIcon) {
		return (
			<Button onClick={onClick}>
				{buttonText && buttonText}
				<Icon component={renderedIcon} />
			</Button>
		);
	}

	return (
		<Button icon={icon} onClick={onClick}>
			{buttonText && buttonText}
		</Button>
	);
};

export default EspressoButton;
