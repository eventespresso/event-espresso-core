import React from 'react';
import classNames from 'classnames';

import { IconButton, IconButtonProps } from '@infraUI/inputs';
import { EspressoIconButtonProps } from './types';
import { withLabel, withTooltip } from '../../display';

type ButtonType = React.ComponentType<EspressoIconButtonProps>;

const EspressoIconButton = React.forwardRef<typeof IconButton, IconButtonProps>(
	({ className, icon, onClick, ...props }, ref) => {
		const newClassName = classNames('esprs-button', className);

		return <IconButton {...props} className={newClassName} icon={icon} onClick={onClick} tabIndex={0} ref={ref} />;
	}
);

export default withLabel(withTooltip(EspressoIconButton as ButtonType) as ButtonType);
