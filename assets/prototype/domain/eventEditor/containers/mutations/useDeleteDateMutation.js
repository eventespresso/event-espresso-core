import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_DATETIME = gql`
	mutation updateDatetime($input: UpdateDatetimeInput!) {
		updateDatetime(input: $input) {
			datetime {
				id
				datetimeId
				name
				description
				startDate
				endDate
			}
		}
	}
`;

const useDeleteDatetimeMutation = () => {
	const [deleteDatetime, { loading, error }] = useMutation(UPDATE_DATETIME);

	console.log({ loading, error });

	return deleteDatetime;
};

export default useDeleteDatetimeMutation;
