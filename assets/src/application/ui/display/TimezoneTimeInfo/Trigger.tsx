import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { GlobalOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@application/ui/input';
import { useMemoStringify } from '@application/services/hooks';
import { TooltipProps } from '@infraUI/display';

interface TriggerProps {
	className?: string;
	color?: 'white' | 'black';
	onClick?: VoidFunction;
	size?: 'big' | 'bigger' | 'small' | 'smaller' | 'tiny';
	tooltip: string;
}

const Trigger = forwardRef<typeof IconButton, TriggerProps>(({ size, ...props }, ref) => {
	const tooltipProps = useMemoStringify<TooltipProps>({ placement: 'top' });
	const className = classNames('ee-timezone-info__button', size && `ee-btn--${size}`, props.className);
	return (
		<IconButton
			{...props}
			className={className}
			icon={() => <GlobalOutlined noMargin size={size} />}
			tooltipProps={tooltipProps}
			ref={ref}
		/>
	);
});

export default Trigger;
