import useInitQueries from '../data/initialization/useInitQueries';
import useI18nData from '../data/initialization/useI18nData';
import { setLocaleData } from '@wordpress/i18n';

const useEditorInitialization = (): void => {
	// init i18n
	const localeData = useI18nData();
	setLocaleData(localeData, 'event_espresso');

	// Fire initial queries
	useInitQueries();
};

export default useEditorInitialization;
