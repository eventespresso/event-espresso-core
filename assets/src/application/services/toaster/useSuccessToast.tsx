import { useCallback } from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import { SuccessToast } from './types';

const useSuccessToast: SuccessToast = (toaster, hash) =>
	useCallback<any>(
		(message = '', description, duration, placement) => {
			const args: ArgsProps = {
				message,
				description,
				duration,
				placement: placement || 'bottomRight',
			};

			setTimeout(() => {
				notification.success(args);
			}, 0);
		},
		[toaster, hash]
	);

export default useSuccessToast;
