import { useCallback } from 'react';
import { notification } from 'antd';

import { DismissToast, DismissToastCallback } from './types';

const useDismissLoading: DismissToast = () =>
	useCallback<DismissToastCallback>((key) => {
		notification.close(key);
	}, []);

export default useDismissLoading;
