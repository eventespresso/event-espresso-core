import { LocaleProps } from './types';

export const Locale = ({ user, site }: LocaleProps): LocaleProps => {
	return {
		user: user || 'en_US',
		site: site || 'en_US',
	};
};
