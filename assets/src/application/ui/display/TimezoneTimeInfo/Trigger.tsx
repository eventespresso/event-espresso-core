import React, { forwardRef } from 'react';

import { Tooltip } from '@infraUI/display';
import { GlobalOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@application/ui/input';

interface Props {
	label: string;
	onClick?: VoidFunction;
}

const Trigger = forwardRef<typeof IconButton, Props>(({ label, onClick }, ref) => {
	return (
		<Tooltip onClick={onClick} title={label}>
			<IconButton
				aria-label={label}
				borderless
				color='white'
				icon={() => <GlobalOutlined />}
				onClick={onClick}
				ref={ref}
			/>
		</Tooltip>
	);
});

export default Trigger;
