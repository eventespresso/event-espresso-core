import pathOr from 'ramda/src/pathOr';

import { GET_CURRENT_USER } from './';
import { ReadQueryOptions, useCacheQuery } from '../../../../../eventEditor/services/apollo/queries';
import { CurrentUserProps, Viewer } from '../../../../../../application/valueObjects/config/types';

/**
 * A custom react hook for retrieving CurrentUser
 */
const useCurrentUser = (): CurrentUserProps => {
	const options: ReadQueryOptions = {
		query: GET_CURRENT_USER,
	};
	const { data } = useCacheQuery<Viewer>(options);

	return pathOr<CurrentUserProps>(null, ['viewer'], data);
};

export default useCurrentUser;
