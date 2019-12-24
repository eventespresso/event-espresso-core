import path from 'ramda/src/path';
import {
	Currency,
	CurrencyProps,
	CurrentUser,
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

const data = path<JsDataProps>(['eejsdata', 'data'], window);

export type JsDataProps = {
	brandName: string;
	currency_config: CurrencyProps;
	eejs_api_nonce: string;
	locale: JsDataLocaleProps;
	nonce: string;
	paths: JsDataPathsProps;
	default_timezone: JsDataTimezoneProps;
};

type JsDataLocaleProps = {
	user: string;
	site: string;
};

type JsDataPathsProps = {
	admin_url: string;
	site_url: string;
};

type JsDataTimezoneProps = {
	pretty: string;
	string: string;
	offset: number;
};

export type ConfigDataProps = {
	brandName: string;
	currency: CurrencyProps;
	currentUser: CurrentUserProps;
	dateTimeFormats: DateTimeFormatsProps;
	locale: LocaleProps;
	nonce: string;
	siteUrl: SiteUrlProps;
	timezone: TimezoneProps;
};

export const ConfigData: ConfigDataProps = {
	brandName: data.brandName || 'Event Espresso',
	currency: Currency(data.currency_config as CurrencyProps),
	currentUser: CurrentUser({} as CurrentUserProps),
	dateTimeFormats: DateTimeFormats({} as DateTimeFormatsProps),
	locale: Locale({
		user: data.locale && data.locale.user ? data.locale.user : '',
		site: data.locale && data.locale.site ? data.locale.site : '',
	} as LocaleProps),
	nonce: data.eejs_api_nonce || '',
	siteUrl: SiteUrl({
		admin: data.paths && data.paths.admin_url ? data.paths.admin_url : '',
		home: data.paths && data.paths.site_url ? data.paths.site_url : '',
	} as SiteUrlProps),
	timezone: Timezone({
		city: data.default_timezone && data.default_timezone.pretty ? data.default_timezone.pretty : '',
		name: data.default_timezone && data.default_timezone.string ? data.default_timezone.string : '',
		offset: data.default_timezone && data.default_timezone.offset ? data.default_timezone.offset : 0,
	} as TimezoneProps),
};
