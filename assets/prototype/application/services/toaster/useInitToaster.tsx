import { ApolloError } from 'apollo-client';
import { useState, useEffect } from 'react';

import useToaster from './useToaster';
import { ToasterInit, ToasterNotices } from './types';

const useInitToaster: ToasterInit = ({ loadingMessage, successMessage }) => {
	const toaster = useToaster();

	const useInitializationNotices: ToasterNotices = (loadingFlag, loadingError): void => {
		const [initialized, setInitialized] = useState(false);

		if (!initialized) {
			toaster.loading(loadingFlag, loadingMessage);
			toaster.error(loadingError);
		}

		useEffect((): void => {
			if (!initialized && !loadingFlag) {
				setInitialized(true);
			}
		}, [initialized]);
	};

	return {
		onCompleted: (): void => {
			toaster.dismiss(loadingMessage);
			toaster.success(successMessage);
		},
		onError: (error: ApolloError): void => {
			toaster.dismiss(loadingMessage);
			toaster.error(error);
		},
		initializationNotices: useInitializationNotices,
	};
};

export default useInitToaster;
