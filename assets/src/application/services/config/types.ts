import {
	CurrencyProps,
	CurrentUserProps,
	GeneralSettings,
	DateTimeFormatsProps,
	LocaleProps,
	SiteUrlProps,
	TimezoneProps,
} from '../../valueObjects/config/types';

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
