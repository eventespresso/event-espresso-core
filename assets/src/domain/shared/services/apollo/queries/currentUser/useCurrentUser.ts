import { GET_CURRENT_USER } from './';
import { ReadQueryOptions } from '@edtrServices/apollo/queries';
import { useCacheQuery } from '@dataServices/apollo/queries';
import { CurrentUserProps, Viewer } from '@application/valueObjects/config/types';

/**
 * A custom react hook for retrieving CurrentUser
 */
const useCurrentUser = (): CurrentUserProps => {
	const options: ReadQueryOptions = {
		query: GET_CURRENT_USER,
	};
	const { data } = useCacheQuery<Viewer>(options);

	return data?.viewer;
};

export default useCurrentUser;
