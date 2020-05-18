import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '.';
import { FetchQueryResult } from '../types';
import { Viewer } from '@application/valueObjects/config/types';

const useFetchCurrentUser = (): FetchQueryResult<Viewer> => {
	const { data, error, loading } = useQuery<Viewer>(GET_CURRENT_USER);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchCurrentUser;
