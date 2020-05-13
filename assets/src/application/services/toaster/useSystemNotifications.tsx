import React, { useCallback } from 'react';
import { theme } from '@chakra-ui/core';
import { toast } from 'react-toastify';

import { Check, CloseCircleOutlined, InfoCircleOutlined, Spinner } from '@appDisplay/icons/svgs';

import { DissmissToast, SystemNotificationsToaster, ToastProps, UpdateToast } from './types';
import Toaster from './Toaster';

const { colors } = theme;

const position = toast.POSITION.BOTTOM_RIGHT as 'bottom-right';
const className = 'ee-toaster-notice__toast';
const fontSize = '1.2rem';

const useSystemNotifications = (): SystemNotificationsToaster => {
	const dismiss: DissmissToast = useCallback((toastId) => toast.dismiss(toastId), []);

	const dissmissAll = (): void => {
		toast.dismiss();
	};

	const error = useCallback(({ message }) => {
		const icon = <CloseCircleOutlined color='rgb(255, 77, 79)' fontSize={fontSize} />;

		toast(<Toaster icon={icon} message={message} />, {
			className,
			position,
		});
	}, []);

	const info = useCallback(({ message }): void => {
		const icon = <InfoCircleOutlined color={colors.blue['500']} fontSize={fontSize} />;

		toast(<Toaster icon={icon} message={message} />, {
			className,
			position,
		});
	}, []);

	const loading = useCallback(({ key: toastId, message }: ToastProps): void => {
		const icon = <Spinner className='ee-loading-spinner' color={colors.cyan['500']} fontSize={fontSize} />;

		toast(<Toaster icon={icon} message={message} />, {
			autoClose: false,
			className,
			position,
			toastId,
		});
	}, []);

	const success = useCallback(({ message, toastId }): void => {
		const icon = <Check color={colors.green['500']} fontSize={fontSize} />;

		toast(<Toaster icon={icon} message={message} />, {
			className,
			position,
			toastId,
		});
	}, []);

	const update: UpdateToast = useCallback(({ message, toastId, type }) => {
		const icon = <Check color={colors.green['500']} fontSize={fontSize} />;
		console.log(toastId);
		const render = (): JSX.Element => <Toaster icon={icon} message={message} />;
		// const render = 'New content';

		toast.update(toastId, { autoClose: 5000, render, type });
	}, []);

	const warning = useCallback(({ message }): void => {
		const icon = <InfoCircleOutlined color={colors.orange[500]} fontSize={fontSize} />;

		toast(<Toaster icon={icon} message={message} />, {
			className,
			position,
		});
	}, []);

	return {
		dismiss,
		dissmissAll,
		error,
		info,
		loading,
		success,
		update,
		warning,
	};
};

export default useSystemNotifications;
