import { setLocaleData } from '@wordpress/i18n';

// init i18n for all blocks
const localeData = window?.eventEspressoData?.i18n;
setLocaleData(localeData, 'event_espresso');
