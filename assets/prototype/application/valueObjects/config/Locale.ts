export interface LocaleProps {
	user: string;
	site: string;
}

export const Locale = ({ user, site }: LocaleProps): LocaleProps => {
	return {
		user: user || 'en_US',
		site: site || 'en_US',
	};
};
