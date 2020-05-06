import React from 'react';
import { theme } from '@chakra-ui/core';

import { Check, InfoCircleOutlined, Spinner, Warning, WarningTriangle } from '@appDisplay/icons/svgs';
import { ToastIconProps, TOAST_STATUS } from './types';

const { colors } = theme;

const ToastIcon: React.FC<ToastIconProps> = ({ type = TOAST_STATUS.INFO }) => {
	const className = 'ee-toaster-notice__icon';

	const statusIcons = {
		ERROR: <Warning className={className} color={colors.white} />,
		INFO: <InfoCircleOutlined className={className} color={colors.blue['500']} />,
		LOADING: <Spinner className={className} color={colors.cyan['500']} />,
		SUCCESS: <Check className={className} color={colors.green['500']} />,
		WARNING: <WarningTriangle className={className} color={colors.green['900']} />,
	};

	return statusIcons[type];
};

export default ToastIcon;
