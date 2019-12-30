import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_CURRENT_USER } from './';
import { ReadQueryOptions } from '../types';
import { CurrentUserProps } from '../../../../../application/valueObjects/config/types';
/**
 * A custom react hook for retrieving CurrentUser
 */
const useCurrentUser = (): CurrentUserProps => {
	const client = useApolloClient();
	let data: any;

	try {
		const options: ReadQueryOptions = {
			query: GET_CURRENT_USER,
		};
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}
	return pathOr<CurrentUserProps>(null, ['viewer'], data);
};

export default useCurrentUser;
