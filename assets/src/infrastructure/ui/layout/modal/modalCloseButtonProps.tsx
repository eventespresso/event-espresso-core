import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { Close } from '@appDisplay/icons';

import './styles.scss';

const modalCloseButtonProps: ButtonProps = {
	className: 'ee-icon-button ee-confirm-close',
	icon: Close,
};

export default modalCloseButtonProps;
