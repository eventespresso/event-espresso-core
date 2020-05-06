import React from 'react';
import classNames from 'classnames';
import ReachAlert from '@reach/alert';
import { __ } from '@wordpress/i18n';

import { Box } from '@infraUI/display';
import { CloseOutlined } from '@appDisplay/icons/svgs';
import { IconButton } from '@infraUI/inputs';
import { ThemeProvider } from '@appServices/theme';
import { ToastProps, TOAST_STATUS } from './types';
import ToastIcon from './ToastIcon';
import withAnimation from './withAnimation';

const baseClass = 'ee-toaster-notice';

const Toast: React.FC<Omit<ToastProps, 'position'>> = ({
	message,
	isClosable = true,
	onClose,
	messageProps,
	titleProps,
	type = TOAST_STATUS.INFO,
	title,
	...props
}) => {
	const status = type.toLowerCase();
	const className = classNames(props.className, baseClass, `${baseClass}--${status}`);

	return (
		<ThemeProvider>
			<ReachAlert>
				<Box {...props} role='alert' className={className}>
					<ToastIcon type={type} />
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
							icon={CloseOutlined}
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
