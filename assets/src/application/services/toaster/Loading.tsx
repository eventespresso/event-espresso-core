import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Spinner } from '@appDisplay/icons/svgs';
import { ToastIconProps } from './types';

const Loading: React.FC<ToastIconProps> = ({ closeToast, loading, message = 'loading...', toastId }) => {
	useEffect(() => {
		if (!loading) {
			toast.dismiss(toastId);
		}
	}, [loading]);

	return (
		<div>
			{message}
			<button onClick={closeToast}>Close</button>
		</div>
	);
};

export default Loading;
