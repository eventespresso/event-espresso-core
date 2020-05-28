import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { iconBtnClassName } from '@application/ui/input/Button/IconButton';
import { ConfirmPropsWithButton } from './types';
import useConfirmationDialog from './useConfirmationDialog';

const useConfirmWithButton: React.FC<ConfirmPropsWithButton> = ({ buttonProps, ...props }) => {
	const title = (props.title || buttonProps?.tooltip) ?? __('Please confirm this action.');
	const { confirmationDialog, onOpen } = useConfirmationDialog({ ...props, title });
	const btnClassName = classNames(buttonProps.icon && iconBtnClassName, buttonProps.className);

	return (
		<>
			<Button {...buttonProps} className={btnClassName} onClick={onOpen} />
			{confirmationDialog}
		</>
	);
};

export default useConfirmWithButton;
