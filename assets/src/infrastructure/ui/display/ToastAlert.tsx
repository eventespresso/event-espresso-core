import React from 'react';
import classNames from 'classnames';
import {
	Alert as ChakraAlert,
	AlertTitle,
	AlertDescription,
	Box,
	BoxProps,
	CloseButton,
	Icon,
	IconProps,
} from '@chakra-ui/core';
import { AnyObject } from '@appServices/utilities/types';

export enum STATUS {
	ERROR = 'ERROR',
	INFO = 'INFO',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	WARNING = 'WARNING',
}

export interface ToastAlertButtonProps extends AnyObject {
	isClosable?: boolean;
	onClose: (event: React.MouseEvent) => void;
}
export interface ToastAlertIconProps extends AnyObject, IconProps {}
export interface ToastAlertNoticeProps extends AnyObject, BoxProps {
	text?: string;
}
export interface ToastAlertTitleProps extends AnyObject, BoxProps {
	text?: string;
}
export interface ToastAlertProps {
	baseClassName?: string;
	className?: string;
	btnProps: ToastAlertButtonProps;
	iconProps: ToastAlertIconProps;
	noticeProps: AnyObject;
	status?: keyof typeof STATUS;
	titleProps?: ToastAlertTitleProps;
	variant: 'subtle' | 'solid';
}

export const ToastAlert: React.FC<ToastAlertProps> = ({
	baseClassName,
	className,
	btnProps,
	iconProps,
	noticeProps,
	status = STATUS.INFO,
	titleProps,
	variant,
	...props
}) => {
	console.log('%c ToastAlert', 'color: Violet;');
	console.log('%c 	baseClassName', 'color: Violet;', baseClassName);
	console.log('%c 	btnProps', 'color: Violet;', btnProps);
	console.log('%c 	iconProps', 'color: Violet;', iconProps);
	console.log('%c 	noticeProps', 'color: Violet;', noticeProps);
	console.log('%c 	status', 'color: Violet;', status);
	console.log('%c 	titleProps', 'color: Violet;', titleProps);
	console.log('%c 	variant', 'color: Violet;', variant);
	console.log('%c 	variant', 'color: props;', props);
	const { isClosable, onClose } = btnProps;
	const { text: title } = titleProps;
	const { text: notice } = noticeProps;
	console.log('%c 	title', 'color: LightViolet;', title);
	console.log('%c 	notice', 'color: LightViolet;', notice);
	const baseClass = baseClassName ? baseClassName : 'ee-alert';
	console.log('%c 	baseClass', 'color: Violet;', baseClass);
	const toastStatus = status.toLowerCase();
	console.log('%c 	toastStatus', 'color: Violet;', toastStatus);
	const htmlClasses = classNames(className, baseClass, `${baseClass}--${toastStatus}`);

	return (
		<ChakraAlert className={htmlClasses} variant={variant} {...props}>
			{iconProps && <Icon className={`${baseClass}__icon`} {...iconProps} />}
			<Box className={`${baseClass}__body`}>
				{title && (
					<AlertTitle className={`${baseClass}__title`} {...titleProps}>
						{title}
					</AlertTitle>
				)}
				{notice && (
					<AlertDescription className={`${baseClass}__text`} {...noticeProps}>
						{notice}
					</AlertDescription>
				)}
			</Box>
			{isClosable && <CloseButton className={`${baseClass}__close-btn`} {...btnProps} onClick={onClose} />}
		</ChakraAlert>
	);
};
