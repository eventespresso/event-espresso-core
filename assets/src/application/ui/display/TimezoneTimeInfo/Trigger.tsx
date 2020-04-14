import React, { forwardRef } from 'react';

import { Tooltip } from '@infraUI/display';
import { IconButton } from '@infraUI/inputs';

interface Props {
	label: string;
	onClick?: VoidFunction;
}

const Trigger: React.FC<Props> = forwardRef(({ label, onClick }, ref) => {
	return (
		<Tooltip onClick={onClick} title={label}>
			<IconButton aria-label={label} icon='info-outline' onClick={onClick} ref={ref} variant='unstyled' />
		</Tooltip>
	);
});

export default Trigger;
