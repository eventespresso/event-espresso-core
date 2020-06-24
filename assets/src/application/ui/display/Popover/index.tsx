import React from 'react';

import PopoverAdapter, { PopoverProps } from '@infraUI/display/Popover';

import './style.scss';

const Popover: React.FC<PopoverProps> = (props) => <PopoverAdapter {...props} contentClassName="ee-popover__content" />;

export default Popover;
