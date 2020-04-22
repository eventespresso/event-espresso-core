import React from 'react';
import classNames from 'classnames';

import { IconButton as IconButtonAdapter, IconButtonProps as IconButtonAdapterProps } from '@infraUI/inputs';
import { IconButtonProps } from './types';
import { withLabel, withTooltip } from '../../display';

type BtnType = React.ComponentType<IconButtonProps>;

const IconButton = React.forwardRef<typeof IconButtonAdapter, IconButtonAdapterProps>(
	({ icon, onClick, ...props }, ref) => {
		const className = classNames('ee-button', props.className);

		return (
			<IconButtonAdapter {...props} className={className} icon={icon} onClick={onClick} tabIndex={0} ref={ref} />
		);
	}
);

export default withLabel(withTooltip(IconButton as BtnType) as BtnType);
