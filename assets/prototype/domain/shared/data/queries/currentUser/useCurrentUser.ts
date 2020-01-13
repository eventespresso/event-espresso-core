import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_CURRENT_USER } from './';
import { ReadQueryOptions } from '../../../../eventEditor/data/queries/types';
import { CurrentUserProps, Viewer } from '../../../../../application/valueObjects/config/types';
/**
 * A custom react hook for retrieving CurrentUser
 */
const useCurrentUser = (): CurrentUserProps => {
	const client = useApolloClient();
	let data: Viewer;

	try {
		const options: ReadQueryOptions = {
			query: GET_CURRENT_USER,
		};
		data = client.readQuery<Viewer>(options);
	} catch (error) {
		data = null;
	}
	return pathOr<CurrentUserProps>(null, ['viewer'], data);
};

export default useCurrentUser;
