import React, { forwardRef } from 'react';

import { GlobalOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@application/ui/input';

interface TriggerProps {
	tooltip: string;
	onClick?: VoidFunction;
}

const Trigger = forwardRef<typeof IconButton, TriggerProps>(
	({ tooltip, ...props }, ref) => (
		<IconButton
			borderless
			color='white'
			className='ee-timezone-info-btn'
			icon={ () => <GlobalOutlined /> }
			tooltip={ tooltip }
			tooltipProps={ { placement: 'top' } }
			{ ...props }
			ref={ ref }
		/>
	)
);

export default Trigger;
