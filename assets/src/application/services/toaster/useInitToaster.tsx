import { ApolloError } from 'apollo-client';
import { useState, useEffect } from 'react';

import useToaster from './useToaster';
import { errorNotification, successNotification } from '../notification';
import { ToasterInit, ToasterInitCallbacks, ToasterNotices } from './types';

const useInitToaster: ToasterInit = ({ loadingMessage, successMessage }): ToasterInitCallbacks => {
	const toaster = useToaster();

	const useInitializationNotices: ToasterNotices = (loadingFlag, loadingError): void => {
		const [initialized, setInitialized] = useState(false);

		if (!initialized) {
			toaster.loading(loadingFlag, loadingMessage);
			errorNotification({ message: loadingError });
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
			successNotification({ message: successMessage });
		},
		onError: (error: ApolloError): void => {
			toaster.dismiss(loadingMessage);
			errorNotification({ message: error });
		},
		initializationNotices: useInitializationNotices,
	};
};

export default useInitToaster;
