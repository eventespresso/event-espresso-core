import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { ConfirmPropsWithButton } from './types';
import useConfirmationDialog from './useConfirmationDialog';

const useConfirmWithButton: React.FC<ConfirmPropsWithButton> = ({ buttonProps, ...props }) => {
	const confirmText = buttonProps?.tooltip ?? __('Please confirm this action.');
	const { confirmationDialog, onOpen } = useConfirmationDialog({ ...props, confirmText });

	return (
		<>
			<Button {...buttonProps} onClick={onOpen} />
			{confirmationDialog}
		</>
	);
};

export default useConfirmWithButton;
