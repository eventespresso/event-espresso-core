import React from 'react';
import classNames from 'classnames';
import { CompassFilled } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { __ } from '@wordpress/i18n';

import FilterButtonWrap from './FilterButtonWrap';
import { ToggleLegendButtonProps } from '../types';
import { EspressoButton, EspressoButtonType } from '@appInputs/EspressoButton';

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
		<FilterButtonWrap id={filterId} label={__('legend')}>
			<EspressoButton
				buttonType={EspressoButtonType.MINIMAL}
				className={className}
				icon={icon}
				id={filterId}
				onClick={toggleLegend}
				tooltip={tooltip}
			/>
		</FilterButtonWrap>
	);
};

export default ToggleLegendButton;
