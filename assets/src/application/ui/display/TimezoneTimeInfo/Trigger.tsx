import React, { forwardRef } from 'react';

import { Tooltip } from '@infraUI/display';
import { IconButton } from '@infraUI/inputs';

interface Props {
	label: string;
	onClick?: VoidFunction;
}

const Trigger: React.FC<Props> = forwardRef(({ label, onClick }, ref) => {
	return (
		// TODO: refactor this by using `withTooltip` when that is updated with chakra components
		<Tooltip onClick={onClick} title={label}>
			<IconButton aria-label={label} icon='info-outline' onClick={onClick} ref={ref} variant='unstyled' />
		</Tooltip>
	);
});

export default Trigger;
