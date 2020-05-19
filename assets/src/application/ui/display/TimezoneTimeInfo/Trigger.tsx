import React, { forwardRef } from 'react';

import { GlobalOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@application/ui/input';

interface TriggerProps {
	tooltip: string;
	onClick?: VoidFunction;
}

const Trigger = forwardRef<typeof IconButton, TriggerProps>(({ tooltip, ...props }, ref) => (
	<IconButton
		{...props}
		borderless
		color='white'
		className='ee-timezone-info__button'
		icon={() => <GlobalOutlined size='small' />}
		tooltip={tooltip}
		tooltipProps={{ placement: 'top' }}
		ref={ref}
	/>
));

export default Trigger;
