import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { InfoCircleOutlined } from '../svgs/index'
import { IconProps } from '../types'

import './style.scss'

const HelpIcon = forwardRef<IconProps, any>((props, ref) => {
	const className = classNames('ee-help-icon', props.className);

	return <InfoCircleOutlined {...props} className={className} ref={ref} />
});

export default HelpIcon;
