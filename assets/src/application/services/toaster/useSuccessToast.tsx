import { useCallback } from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import { SuccessToast, SuccessToastCallback } from './types';

const useSuccessToast: SuccessToast = (toaster, hash) =>
	useCallback<SuccessToastCallback>(
		({ message = '', description, duration, placement = 'bottomRight' }) => {
			const args: ArgsProps = {
				message,
				description,
				duration,
				placement,
			};

			setTimeout(() => {
				notification.success(args);
			}, 0);
		},
		[toaster, hash]
	);

export default useSuccessToast;
