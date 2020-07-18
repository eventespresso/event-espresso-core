import React from 'react';
import classNames from 'classnames';

import PopoverAdapter, { PopoverProps } from '@infraUI/display/Popover';

import './style.scss';

const Popover: React.FC<PopoverProps> = (props) => {
	const className = classNames('ee-popover', props.className);
	return (
		<div className={className}>
			<PopoverAdapter {...props} contentClassName='ee-popover__content' />
		</div>
	);
};

export default Popover;
