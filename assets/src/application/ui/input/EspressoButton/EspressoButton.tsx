import React from 'react';
import AntIcon from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import invariant from 'invariant';

import { isEmpty } from '@appServices/utilities/string';
import { ButtonType, EspressoButtonProps, EspressoButtonSize, EspressoButtonType, Icon } from './types';
import { EspressoIcon, isEspressoIcon, withLabel, withTooltip } from '../../display';

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const EspressoButton = React.forwardRef<Button, EspressoButtonProps>((props, ref) => {
	const {
		buttonText,
		buttonSize = EspressoButtonSize.DEFAULT,
		buttonType = EspressoButtonType.DEFAULT,
		className: htmlClass,
		icon,
		onClick,
		...rest
	} = props;
	if (ref) {
		console.log('%c EspressoButton', 'color: Violet;');
		console.log('%c 	buttonText', 'color: Violet;', buttonText || icon, props);
		console.log('%c 	ref', 'color: Violet;', ref);
	}
	const ariaLabelledBy = rest['aria-labelledby'] || null;
	// make sure button has text or aria-labelledby
	const hasLabelOrText = !(isEmpty(buttonText) && isEmpty(ariaLabelledBy));
	invariant(hasLabelOrText, 'You must provide a value for `ariaLabel` or `buttonText`');

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
					{...rest}
					className={className}
					icon={<AntIcon component={svgIcon} />}
					onClick={onClick}
					ref={ref}
					tabIndex={0}
				>
					{buttonText && buttonText}
				</Button>
			);
		}
	}

	// AntD or JSX element icon
	return (
		<Button {...rest} className={className} icon={icon} onClick={onClick} ref={ref} tabIndex={0}>
			{buttonText && buttonText}
		</Button>
	);
});

// Since withLabel and withTooltip accept only a component type
// Lets cast it
export default withLabel(withTooltip(EspressoButton as ButtonType) as ButtonType);
