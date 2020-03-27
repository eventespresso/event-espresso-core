import React from 'react';
import { Tooltip as DefaultTooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
// import { withViewportMatch } from '@appDisplay/viewport';
import { __ } from '@wordpress/i18n';

import { isEmpty } from '@appServices/utilities/string';
import './style.scss';

interface TicketsChainedButtonProps extends TooltipPropsWithTitle {
	button: JSX.Element;
	buttonText?: string;
	isMobile?: boolean;
}

const Tooltip: React.FC<TicketsChainedButtonProps> = ({ button, buttonText, isMobile, title, ...props }) => {
	const mobileHelpText = isEmpty(buttonText) ? (
		<div className='esprs-button__mobile-tooltip-wrapper'>
			{button}
			<div className='esprs-button__mobile-tooltip'>{title}</div>
		</div>
	) : (
		button
	);

	return isMobile ? (
		mobileHelpText
	) : (
		<DefaultTooltip title={title} {...props}>
			{button}
		</DefaultTooltip>
	);
};

export default Tooltip;
// export default withViewportMatch({ isMobile: '< small' })(Tooltip);
