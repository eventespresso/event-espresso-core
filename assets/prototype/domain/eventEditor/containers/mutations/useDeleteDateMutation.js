import { useMutation } from '@apollo/react-hooks';

export const DELETE_DATETIME = gql`
	mutation deleteDatetime($input: DeleteDatetimeInput!) {
		deleteDatetime(input: $input) {
			datetime {
				id
			}
		}
	}
`;

const useDeleteDatetimeMutation = ({ id }) => {
	const [deleteDatetime] = useMutation(DELETE_DATETIME);

	return deleteDatetime;
};

export default useDeleteDatetimeMutation;
