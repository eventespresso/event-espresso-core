import { LocaleProps } from './types';

export const Locale = ({ user, site }: LocaleProps): LocaleProps => {
	const userLocale = user?.replace('_', '-') || 'en-US';
	const siteLocale = site?.replace('_', '-') || 'en-US';
	return {
		user: userLocale,
		site: siteLocale,
	};
};
