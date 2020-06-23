import {
	Currency,
	CurrencyProps,
	CurrentUserProps,
	DateTimeFormats,
	DateTimeFormatsProps,
	Locale,
	LocaleProps,
	SiteUrl,
	SiteUrlProps,
	Timezone,
	TimezoneProps,
} from '../../valueObjects/config';
import { ApiDomData, ConfigDataProps, ConfigDomData } from './types';

export const useConfigData = (): ConfigDataProps => {
	const api: ApiDomData = window?.eventEspressoData?.api;
	const config: ConfigDomData = window?.eventEspressoData?.config;

	const configData = {
		brandName: config?.coreDomain?.brandName || 'Event Espresso',
		currency: Currency(config?.siteCurrency as CurrencyProps),
		currentUser: config?.currentUser as CurrentUserProps,
		generalSettings: config?.generalSettings,
		dateTimeFormats: DateTimeFormats({
			dateFormat: config?.generalSettings?.dateFormat,
			timeFormat: config?.generalSettings?.timeFormat,
		} as DateTimeFormatsProps),
		locale: Locale({
			site: config?.locale?.site || '',
			siteTimezone: config?.locale?.siteTimezone || {},
			user: config?.locale?.user || '',
		} as LocaleProps),
		nonce: api?.restApiNonce || '',
		siteUrl: SiteUrl({
			admin: config?.siteUrls?.admin || '',
			home: config?.siteUrls?.home || '',
		} as SiteUrlProps),
		timezone: Timezone({
			city: config?.locale?.siteTimezone?.city || '',
			name: config?.locale?.siteTimezone?.name || '',
			offset: config?.locale?.siteTimezone?.offset || 0,
		} as TimezoneProps),
	};
	return configData;
};
