import { useInitQueries, useI18nData } from '../services/apollo';
import { setLocaleData } from '@wordpress/i18n';
import { useEntityActionsMenuSubscription } from '../../../application/ui/layout/entityActionsMenu';

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
