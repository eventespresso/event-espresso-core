import React from 'react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { Tooltip as DefaultTooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import { __ } from '@wordpress/i18n';

import { isEmpty } from '@appServices/utilities/string';

interface TicketsChainedButtonProps extends TooltipPropsWithTitle {
	button: JSX.Element;
	buttonText?: string;
	tooltip?: string;
}

const Tooltip: React.FC<TicketsChainedButtonProps> = ({ button, buttonText, tooltip, ...props }) => {
	const mobileTooltip = isEmpty(buttonText) ? (
		<div>
			{button}
			<div className='esprs-button__tooltip'>{tooltip}</div>
		</div>
	) : (
		button
	);

	return isMobile ? (
		mobileTooltip
	) : (
		<DefaultTooltip title={tooltip} {...props}>
			{button}
		</DefaultTooltip>
	);
};

export default Tooltip;
