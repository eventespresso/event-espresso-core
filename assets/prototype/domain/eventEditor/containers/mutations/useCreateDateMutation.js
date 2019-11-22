import { useMutation } from '@apollo/react-hooks';
import { CREATE_DATE } from './dates';

const useCreateDateMutation = () => {
	const [createDate, { loading, error }] = useMutation(CREATE_DATE);
	return { createDate, loading, error };
};

export default useCreateDateMutation;
