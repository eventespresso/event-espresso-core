import { setLocaleData } from '@wordpress/i18n';

const localeData = window?.eventEspressoData?.i18n;
setLocaleData(localeData, 'event_espresso');
