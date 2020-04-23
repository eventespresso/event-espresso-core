import React, { forwardRef } from 'react';

import { Tooltip } from '@infraUI/display';
import { GlobalOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@infraUI/inputs';

interface Props {
	label: string;
	onClick?: VoidFunction;
}

const Trigger = forwardRef<typeof IconButton, Props>(({ label, onClick }, ref) => {
	return (
		<Tooltip onClick={onClick} title={label}>
			<IconButton
				aria-label={label}
				icon={() => <GlobalOutlined />}
				onClick={onClick}
				ref={ref}
				variant='unstyled'
			/>
		</Tooltip>
	);
});

export default Trigger;
