export interface SiteUrlProps {
	admin: string;
	home: string;
}

export const SiteUrl = ({ admin, home }: SiteUrlProps): SiteUrlProps => {
	return {
		admin: admin || '',
		home: home || '',
	};
};
