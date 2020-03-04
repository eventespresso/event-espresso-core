import {
	CurrencyProps,
	CurrentUserProps,
	GeneralSettings,
	DateTimeFormatsProps,
	LocaleProps,
	SiteUrlProps,
	TimezoneProps,
} from '../../valueObjects/config/types';

export type JsDataProps = {
	brandName: string;
	currency_config: CurrencyProps;
	eejs_api_nonce: string;
	locale: JsDataLocaleProps;
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
	generalSettings: GeneralSettings;
	dateTimeFormats: DateTimeFormatsProps;
	locale: LocaleProps;
	nonce: string;
	siteUrl: SiteUrlProps;
	timezone: TimezoneProps;
};
