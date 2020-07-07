import { setLocaleData } from '@wordpress/i18n';

import useI18nData from './useI18nData';

const useInitialization = (): void => {
	// init i18n
	const localeData = useI18nData();
	setLocaleData(localeData);
};

export default useInitialization;
