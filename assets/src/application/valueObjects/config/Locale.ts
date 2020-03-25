import { LocaleProps } from './types';

export const Locale = ({ user, site }: LocaleProps): LocaleProps => {
	const userLocale = user || 'en-US';
	const siteLocale = site || 'en-US';
	return {
		user: userLocale.replace('_', '-'),
		site: siteLocale.replace('_', '-'),
	};
};
