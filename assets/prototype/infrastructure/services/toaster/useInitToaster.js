import { useState, useEffect } from 'react';
import useToaster from './useToaster';

const useInitToaster = ({ loadingMessage, successMessage }) => {
	const toaster = useToaster();

	const useInitializationNotices = (loadingFlag, loadingError) => {
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
	};

	return {
		onCompleted: () => {
			toaster.dismiss(loadingMessage);
			toaster.success(successMessage);
		},
		onError: (error) => {
			toaster.dismiss(loadingMessage);
			toaster.error(error);
		},
		initializationNotices: useInitializationNotices,
	};
};

export default useInitToaster;
