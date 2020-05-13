import React from 'react';
import { theme } from '@chakra-ui/core';

import { Check, CloseCircleOutlined, InfoCircleOutlined, Spinner } from '@appDisplay/icons/svgs';

const { colors } = theme;
const fontSize = '1.2rem';

const toasterIcons = {
	error: <CloseCircleOutlined color='rgb(255, 77, 79)' fontSize={fontSize} />,
	info: <InfoCircleOutlined color={colors.blue['500']} fontSize={fontSize} />,
	loading: <Spinner className='ee-loading-spinner' color={colors.cyan['500']} fontSize={fontSize} />,
	success: <Check color={colors.green['500']} fontSize={fontSize} />,
	warning: <InfoCircleOutlined color={colors.orange[500]} fontSize={fontSize} />,
};

export default toasterIcons;
