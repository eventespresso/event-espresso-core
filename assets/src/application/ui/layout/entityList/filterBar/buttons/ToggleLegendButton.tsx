import React from 'react';
import classNames from 'classnames';
import { CompassFilled } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType } from '@appInputs/EspressoButton';
import { LabelPosition } from '@application/ui/display';
import { ToggleLegendButtonProps } from '../types';

const ToggleLegendButton: React.FC<ToggleLegendButtonProps> = ({ listId, showLegend, toggleLegend }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': showLegend });
	const iconProps = useSpring({
		transform: `rotate(${showLegend ? 0 : 180}deg)`,
	});
	const icon = (
		<animated.div style={iconProps}>
			<CompassFilled />
		</animated.div>
	);
	const filterId = `ee-toggle-legend-btn-${listId}`;
	const tooltip = __(`${showLegend ? 'hide' : 'show'} legend`);

	return (
		<EspressoButton
			buttonType={EspressoButtonType.MINIMAL}
			className={className}
			icon={icon}
			id={filterId}
			label={__('legend')}
			onClick={toggleLegend}
			tooltip={tooltip}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM_CENTER}
		/>
	);
};

export default ToggleLegendButton;
