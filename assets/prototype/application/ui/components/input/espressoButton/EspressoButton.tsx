import React from 'react';
import classNames from 'classnames';

import { ClickEvent, EspressoButtonProps, EspressoButtonSize, EspressoButtonStyle } from './types';
import { EspressoIcon } from '../../display/espressoIcon';

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
	if (icon) {
		renderedIcon = (
			<span className='img-wrap'>
				<EspressoIcon icon={icon} svgSize={size} />
			</span>
		);
	} else {
		classes += ' ee-noIcon';
	}

	const onClickHandler: ClickEvent = (click) => {
		click.preventDefault();
		click.stopPropagation();
		onClick();
	};

	return (
		<button {...buttonProps} className={classes} onClick={onClickHandler}>
			<span className='text-wrap'>{buttonText}</span>
			{renderedIcon}
		</button>
	);
};

export default EspressoButton;
