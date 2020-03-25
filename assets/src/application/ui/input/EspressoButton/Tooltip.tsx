import React from 'react';
import { Tooltip as DefaultTooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import { withViewportMatch } from '@appDisplay/viewport';
import { __ } from '@wordpress/i18n';

import { isEmpty } from '@appServices/utilities/string';
import './style.scss';

interface TicketsChainedButtonProps extends TooltipPropsWithTitle {
	button: React.ReactNode;
	buttonText?: string;
	isMobile?: boolean;
	tooltip?: string;
}

const Tooltip: React.FC<TicketsChainedButtonProps> = ({ button, buttonText, isMobile, tooltip, ...props }) => {
	const mobileHelpText = isEmpty(buttonText) ? (
		<div className='esprs-button__mobile-tooltip-wrapper'>
			{button}
			<div className='esprs-button__mobile-tooltip'>{tooltip}</div>
		</div>
	) : (
		button
	);

	return isMobile ? (
		mobileHelpText
	) : (
		<DefaultTooltip title={tooltip} {...props}>
			{button}
		</DefaultTooltip>
	);
};

export default withViewportMatch({ isMobile: '< small' })(Tooltip);
