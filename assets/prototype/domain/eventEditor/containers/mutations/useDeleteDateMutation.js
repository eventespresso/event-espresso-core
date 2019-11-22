import { useMutation } from '@apollo/react-hooks';
import { DELETE_DATETIME } from './dates';

const useDeleteDatetimeMutation = () => {
	const [deleteDatetime, { loading, error }] = useMutation(DELETE_DATETIME);

	console.log({ loading, error });

	return deleteDatetime;
};

export default useDeleteDatetimeMutation;
