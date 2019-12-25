import { SiteUrlProps } from './types';

export const SiteUrl = ({ admin, home }: SiteUrlProps): SiteUrlProps => {
	return {
		admin: admin || '',
		home: home || '',
	};
};
