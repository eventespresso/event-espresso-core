import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from './';
import { FetchEntitiesResult } from '../types';

const useFetchCurrentUser = (): FetchEntitiesResult => {
	const { data, error, loading } = useQuery(GET_CURRENT_USER);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchCurrentUser;
