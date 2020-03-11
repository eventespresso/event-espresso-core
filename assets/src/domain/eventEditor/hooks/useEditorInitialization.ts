import { setLocaleData } from '@wordpress/i18n';

import { useI18nData, useInitQueries } from '../services/apollo';
import useEntityActionsMenuSubscription from './useEntityActionsMenuSubscription';

const useEditorInitialization = (): void => {
	// init i18n
	const localeData = useI18nData();
	setLocaleData(localeData);

	// set menu subscription
	useEntityActionsMenuSubscription();

	// Fire initial queries
	useInitQueries();
};

export default useEditorInitialization;
