import { useState, useEffect } from 'react';
import useToaster from './useToaster';

const useInitToaster = ({
	toasterMessage,
	loadingMessage,
	successMessage
}) => {
	const toaster = useToaster();

	const initializationNotices = (loadingFlag, loadingError) => {
		const [initialized, setInitialized] = useState(false);

		if (!initialized) {
			toaster.loading(loadingFlag, loadingMessage);
			toaster.error(loadingError);
		}

		useEffect(() => {
			if (!initialized && !loadingFlag) {
				setInitialized(true);
			}
		}, [initialized]);
	}

	return {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(successMessage);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
		initializationNotices,
	}
};

export default useInitToaster;
