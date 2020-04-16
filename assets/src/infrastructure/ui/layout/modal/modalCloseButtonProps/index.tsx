import React from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { Close } from '@appDisplay/icons';

import './styles.scss';

const modalCloseButtonProps: ButtonProps = {
	className: 'confirm-close',
	icon: Close,
	variant: 'unstyled',
};

export default modalCloseButtonProps;
