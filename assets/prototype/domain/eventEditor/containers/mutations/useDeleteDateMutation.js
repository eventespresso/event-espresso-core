import { useMutation } from '@apollo/react-hooks';
import { DELETE_DATETIME } from './dates';

const useDeleteDatetimeMutation = () => {
	const [deleteDatetime, { loading, error }] = useMutation(DELETE_DATETIME);

	return deleteDatetime;
};

export default useDeleteDatetimeMutation;
