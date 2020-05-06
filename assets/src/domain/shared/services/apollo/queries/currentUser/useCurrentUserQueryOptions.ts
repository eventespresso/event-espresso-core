import { GET_CURRENT_USER } from './queries';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const useCurrentUserQueryOptions = (): ReadQueryOptions => {
	const options: ReadQueryOptions = {
		query: GET_CURRENT_USER,
	};

	return options;
};

export default useCurrentUserQueryOptions;
