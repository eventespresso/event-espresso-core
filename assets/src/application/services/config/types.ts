import {
	CurrencyProps,
	CurrentUserProps,
	GeneralSettings,
	DateTimeFormatsProps,
	LocaleProps,
	SiteUrlProps,
	TimezoneProps,
} from '../../valueObjects/config/types';

export interface EventEspressoDomData {
	api: ApiDomData;
	config: ConfigDomData;
	readonly domain: string;
	eei18n: { [key: string]: any };
	i18n: any;
}

export type ApiDomData = {
	graphqlEndpoint: string;
	restApiBaseUrl: string;
	restApiCollectionEndpoints: { [key: string]: string };
	restApiNonce: string;
	restApiPrimaryKeys: { [key: string]: string | [string] };
	restApiRouteUrl: string;
};

export type ConfigDomData = {
	coreDomain: CoreDomainDomData;
	currentUser: CurrentUserProps;
	generalSettings: GeneralSettings;
	locale: LocaleDomData;
	siteCurrency: CurrencyProps;
	siteUrls: SiteUrlProps;
};

export type CoreDomainDomData = {
	assetNamespace: string;
	brandName: string;
	coreVersion: string;
	distributionAssetsPath: string;
	distributionAssetsUrl: string;
	pluginPath: string;
	pluginUrl: string;
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

export interface LocaleDomData {
	user: string;
	siteTimezone: LocaleTimezoneDomData;
	site: string;
}

export interface LocaleTimezoneDomData {
	city: string;
	name: string;
	offset: number;
}
