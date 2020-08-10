import type { CurrentUserProps } from './types';

export const CurrentUser = (userData: CurrentUserProps): CurrentUserProps => {
	return {
		id: userData?.id,
		databaseId: userData?.databaseId,
		description: userData?.description,
		email: userData?.email,
		firstName: userData?.firstName,
		name: userData?.name,
		nicename: userData?.nicename,
		nickname: userData?.nickname,
		lastName: userData?.lastName,
		locale: userData?.locale,
		username: userData?.username,
	};
};
