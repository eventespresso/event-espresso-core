import React from 'react';
import classNames from 'classnames';
import ReachAlert from '@reach/alert';
import { __ } from '@wordpress/i18n';

import { Box, Icon, IconProps } from '@infraUI/display';
import { IconButton } from '@infraUI/inputs';
import { ThemeProvider } from '@appServices/theme';
import { ToastProps, TOAST_STATUS } from './types';
import withAnimation from './withAnimation';

type IconName = IconProps['name'];

const baseClass = 'ee-toaster-notice';

const statusIcons = {
	ERROR: 'warning',
	INFO: 'info-outline',
	LOADING: 'spinner',
	SUCCESS: 'check',
	WARNING: 'warning-2',
};
const iconColors = {
	ERROR: 'white',
	INFO: 'blue.500',
	LOADING: 'cyan.500',
	SUCCESS: 'green.500',
	WARNING: 'grey.900',
};

const Toast: React.FC<Omit<ToastProps, 'position'>> = ({
	className,
	message,
	isClosable = true,
	onClose,
	messageProps,
	titleProps,
	type = TOAST_STATUS.INFO,
	title,
	...props
}) => {
	const icon: string = statusIcons[type] as IconName;
	const iconColor: string = iconColors[type];

	const status = type.toLowerCase();
	const htmlClasses = classNames(className, baseClass, `${baseClass}--${status}`);

	return (
		<ThemeProvider>
			<ReachAlert>
				<Box role='alert' className={htmlClasses} {...props}>
					{icon && <Icon className={`${baseClass}__icon`} color={iconColor} name={icon} />}
					<Box className={`${baseClass}__body`}>
						{title && (
							<Box
								fontWeight='bold'
								lineHeight='normal'
								className={`${baseClass}__title`}
								{...titleProps}
							>
								{title}
							</Box>
						)}
						{message && (
							<Box className={`${baseClass}__text`} {...messageProps}>
								{message}
							</Box>
						)}
					</Box>
					{isClosable && (
						<IconButton
							aria-label={__('Close')}
							icon={'close'}
							className={`${baseClass}__close-btn`}
							onClick={onClose}
							size={'sm'}
						/>
					)}
				</Box>
			</ReachAlert>
		</ThemeProvider>
	);
};

export default withAnimation(Toast);
