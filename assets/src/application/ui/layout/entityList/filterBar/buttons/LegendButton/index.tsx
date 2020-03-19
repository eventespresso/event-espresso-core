import React from 'react';
import classNames from 'classnames';
import { CompassFilled } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { __ } from '@wordpress/i18n';

import { ToggleLegendButtonProps } from '../../types';
import { EspressoButton, EspressoButtonType, Icon } from '@appInputs/EspressoButton';

import './style.scss';

const LegendButton: React.FC<ToggleLegendButtonProps> = ({ listId, showLegend, toggleLegend }) => {
	const className = classNames('ee-filter-bar-filter-btn', { 'ee-active-legend': showLegend });
	const iconProps = useSpring({
		transform: `rotate(${showLegend ? 0 : 180}deg)`,
	});
	const icon = (
		<animated.div style={iconProps}>
			<CompassFilled />
		</animated.div>
	);
	const id = `ee-toggle-legend-btn-${listId}`;
	const label = __(`${showLegend ? 'hide' : 'show'} legend`);

	return (
		<div className='ee-toggle-legend-btn'>
			<EspressoButton
				buttonType={EspressoButtonType.MINIMAL}
				className={className}
				icon={icon}
				id={id}
				onClick={toggleLegend}
				tooltip={label}
			/>
			<label className='esprs-button-label' htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

export default LegendButton;
