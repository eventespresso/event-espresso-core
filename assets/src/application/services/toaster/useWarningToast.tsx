import { useCallback } from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import { WarningToast, WarningToastCallback } from './types';

const useWarningToast: WarningToast = (toaster, hash) =>
	useCallback<WarningToastCallback>(
		({ message = '', placement = 'bottomRight', ...rest }) => {
			if (message) {
				const args: ArgsProps = {
					...rest,
					message,
					placement,
				};
				notification.warning(args);
			}
		},
		[toaster, hash]
	);

export default useWarningToast;
