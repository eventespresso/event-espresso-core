import React, { forwardRef } from 'react';

import { GlobalOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@application/ui/input';
import { useMemoStringify } from '@application/services/hooks';
import { TooltipProps } from '@infraUI/display';

interface TriggerProps {
	tooltip: string;
	onClick?: VoidFunction;
}

const Trigger = forwardRef<typeof IconButton, TriggerProps>(({ tooltip, ...props }, ref) => {
	const tooltipProps = useMemoStringify<TooltipProps>({ placement: 'top' });
	return (
		<IconButton
			{...props}
			borderless
			color='white'
			className='ee-timezone-info__button ee-btn--tiny'
			icon={() => <GlobalOutlined noMargin size='smaller' />}
			tooltip={tooltip}
			tooltipProps={tooltipProps}
			ref={ref}
		/>
	);
});

export default Trigger;
