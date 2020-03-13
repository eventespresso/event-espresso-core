import { setLocaleData } from '@wordpress/i18n';

import { useI18nData, useInitQueries } from '@edtrServices/apollo';
import { useEntityActionsMenuSubscription } from './entityActionsMenu';
import { useFilterBarUISubscription, useFilterBarService } from './filterBar';

const useEditorInitialization = (): void => {
	// init i18n
	const localeData = useI18nData();
	setLocaleData(localeData);

	// set menu subscription
	useEntityActionsMenuSubscription();

	// set filter bar subscription
	useFilterBarUISubscription();
	useFilterBarService();

	// Fire initial queries
	useInitQueries();
};

export default useEditorInitialization;
