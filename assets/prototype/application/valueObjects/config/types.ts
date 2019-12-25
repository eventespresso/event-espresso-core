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

export interface CurrentUserProps {
	id: number;
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
