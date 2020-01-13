import React from 'react';
import classNames from 'classnames';

import { EspressoButtonProps, EspressoButtonSize, EspressoButtonStyle } from './types';
import { EspressoIcon } from '../../display/espressoIcon';

/**
 * Button wrapper for adding styles
 */
const EspressoButton: React.FunctionComponent<EspressoButtonProps> = ({
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
	let iconSize = 24;
	switch (size) {
		case EspressoButtonSize.TINY:
			iconSize = 18;
			break;
		case EspressoButtonSize.SMALL:
			iconSize = 21;
			break;
		case EspressoButtonSize.BIG:
			iconSize = 27;
			break;
		case EspressoButtonSize.HUGE:
			iconSize = 30;
			break;
	}
	let renderedIcon = null;
	if (icon) {
		renderedIcon = (
			<span className='img-wrap'>
				<EspressoIcon icon={icon} svgSize={iconSize} />
			</span>
		);
	} else {
		classes += ' ee-noIcon';
	}
	return (
		<button {...buttonProps} className={classes} onClick={onClick}>
			<span className='text-wrap'>{buttonText}</span>
			{renderedIcon}
		</button>
	);
};

export default EspressoButton;
