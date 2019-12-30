import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_SETTINGS } from './';
import { FetchEntitiesResult } from '../types';

const useFetchGeneralSettings = (): FetchEntitiesResult => {
	const { data, error, loading } = useQuery(GET_GENERAL_SETTINGS);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchGeneralSettings;
