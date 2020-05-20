import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { ConfirmPropsWithButton } from './types';
import useConfirmationDialog from './useConfirmationDialog';

const useConfirmWithButton: React.FC<ConfirmPropsWithButton> = ({ buttonProps, ...props }) => {
	const confirmText = buttonProps?.tooltip ?? __('Please confirm this action.');
	const { confirmationDialog, onOpen } = useConfirmationDialog({ ...props, confirmText });
	const iconClassName = 'ee-btn-base ee-icon-button';
	const btnClassName = classNames(buttonProps.icon && iconClassName, buttonProps.className);

	return (
		<>
			<Button {...buttonProps} className={btnClassName} onClick={onOpen} />
			{confirmationDialog}
		</>
	);
};

export default useConfirmWithButton;
