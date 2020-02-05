import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '.';
import { FetchEntitiesResult } from '../../../../eventEditor/data/queries/types';
import { Viewer } from '../../../../../application/valueObjects/config/types';

const useFetchCurrentUser = (): FetchEntitiesResult<Viewer> => {
	const { data, error, loading } = useQuery<Viewer>(GET_CURRENT_USER);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchCurrentUser;
