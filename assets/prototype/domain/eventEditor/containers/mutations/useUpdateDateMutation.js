import { useMutation } from '@apollo/react-hooks';
import { UPDATE_DATE } from './dates';

const useUpdateDateMutation = () => {
	const [updateDate, { loading, error }] = useMutation(UPDATE_DATE);
	return { updateDate, loading, error };
};

export default useUpdateDateMutation;
