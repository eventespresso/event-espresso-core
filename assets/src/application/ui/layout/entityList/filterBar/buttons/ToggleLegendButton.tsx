import React from 'react';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { CompassFilled } from '@appDisplay/icons/svgs';
import { ToggleLegendButtonProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const ToggleLegendButton: React.FC<ToggleLegendButtonProps> = ({ listId, showLegend, toggleLegend, ...rest }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': showLegend });
	const iconProps = useSpring({
		display: 'inline-flex',
		transform: `rotate(${showLegend ? 0 : 180}deg)`,
	});

	const icon = () => (
		<animated.div style={iconProps}>
			<CompassFilled />
		</animated.div>
	);

	const filterId = `ee-toggle-legend-btn-${listId}`;
	const tooltip = showLegend ? __('hide legend') : __('show legend');

	return (
		<Button
			className={className}
			icon={icon}
			id={filterId}
			onClick={toggleLegend}
			tooltip={tooltip}
			tooltipProps={{ placement: 'top' }}
			labelClassName={'ee-filter-bar__btn-wrap'}
			{...rest}
		>
			{__('legend')}
		</Button>
	);
};

export default React.memo(ToggleLegendButton, getPropsAreEqual(['listId'], ['showLegend'], ['isDisabled']));
