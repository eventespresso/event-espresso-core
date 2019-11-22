import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const DELETE_DATETIME = gql`
	mutation deleteDatetime($input: DeleteDatetimeInput) {
		deleteDatetime(input: $input) {
			datetime {
				id
			}
		}
	}
`;

const useDeleteDatetimeMutation = () => {
	const [deleteDatetime, { loading, error }] = useMutation(DELETE_DATETIME);

	console.log({ loading, error });

	return deleteDatetime;
};

export default useDeleteDatetimeMutation;
