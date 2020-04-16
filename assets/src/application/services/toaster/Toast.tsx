import React from 'react';
import { ToastAlert, ToastAlertButtonProps } from '@infraUI/display';

import withAnimation from './withAnimation';
import { ToastProps, TOAST_STATUS } from './types';

const Toast: React.FC<ToastProps> = ({
	className,
	message,
	isClosable = true,
	onClose,
	type = TOAST_STATUS.INFO,
	title,
	...props
}) => {
	console.log('%c Toast', 'color: Cyan;');
	console.log('%c 	message', 'color: Cyan;', message, props);
	const bodyProps = {
		// color: 'cyan.500',
		// color: 'cyan',
		name: 'spinner',
	};
	const btnProps: ToastAlertButtonProps = {
		// color: 'cyan.500',
		// color: 'cyan',
		name: 'spinner',
		onClose,
		isClosable,
	};
	const iconProps = {
		// color: 'cyan.500',
		// color: 'cyan',
		name: 'spinner',
	};
	// const noticeProps = { color: 'grey.900', text: message };
	// const titleProps = { color: 'grey.900', text: title };
	const noticeProps = { text: message };
	const titleProps = { text: title };

	// const variant: 'subtle' | 'solid' = 'subtle';
	let variant: 'subtle' | 'solid' = 'subtle';
	switch (type) {
		case TOAST_STATUS.ERROR:
			iconProps.name = 'warning';
			// iconProps.color = 'white';
			// titleProps.color = 'white';
			variant = 'solid';
			break;
		case TOAST_STATUS.INFO:
			iconProps.name = 'info-outline';
			// iconProps.color = 'blue.500';
			// iconProps.color = 'blue';
			break;
		case TOAST_STATUS.LOADING:
			iconProps.name = 'spinner';
			// iconProps.color = 'cyan.500';
			// iconProps.color = 'cyan';
			break;
		case TOAST_STATUS.SUCCESS:
			iconProps.name = 'check';
			// iconProps.color = 'green.500';
			// iconProps.color = 'green';
			break;
		case TOAST_STATUS.WARNING:
			iconProps.name = 'warning-2';
			// iconProps.color = 'gray.900';
			// iconProps.color = 'gray';
			variant = 'solid';
			break;
	}
	return (
		<ToastAlert
			baseClassName={'ee-toaster-notice'}
			btnProps={btnProps}
			iconProps={iconProps}
			noticeProps={noticeProps}
			status={type}
			titleProps={titleProps}
			variant={variant}
			{...bodyProps}
			{...props}
		/>
	);
};

export default withAnimation(Toast);
