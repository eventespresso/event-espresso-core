export interface CurrencyProps {
	code: string;
	singularLabel: string;
	pluralLabel: string;
	sign: string;
	signB4: boolean;
	decimalPlaces: number;
	decimalMark: string;
	thousandsSeparator: string;
	subunits?: number;
}

export interface Viewer {
	viewer: CurrentUserProps;
}

export interface CurrentUserProps {
	id: string;
	description: string;
	email: string;
	firstName: string;
	name: string;
	nicename: string;
	nickname: string;
	lastName: string;
	locale: string;
	userId: number;
	username: string;
}

export interface GeneralSettingsData {
	generalSettings: GeneralSettings;
}

export interface GeneralSettings {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
}

export interface DateTimeFormatsProps {
	dateFormat: string;
	timeFormat: string;
	dateTimeFormat?: string;
}

export interface LocaleProps {
	user: string;
	site: string;
}

export interface SiteUrlProps {
	admin: string;
	home: string;
}

export interface TimezoneProps {
	city: string;
	name: string;
	offset: number;
}
