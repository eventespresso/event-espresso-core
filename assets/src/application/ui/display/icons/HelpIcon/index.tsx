import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { ClickableIconWithTooltip } from '@appDisplay/Tooltip';
import { InfoCircleOutlined } from '../svgs/index';
import { IconProps } from '../types';

import './style.scss';

const HelpIcon = forwardRef<IconProps, any>(({ clickable, tooltipText, ...props }, ref) => {
	const className = classNames('ee-help-icon', props.className);

	if (clickable) {
		return (
			<ClickableIconWithTooltip
				className={className}
				icon={InfoCircleOutlined}
				tooltipText={tooltipText}
			/>
		);
	};

	return <InfoCircleOutlined {...props} className={className} ref={ref} />;
});

export default HelpIcon;
