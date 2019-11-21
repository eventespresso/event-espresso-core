import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_DATE = gql`
	mutation createDatetime($input: CreateDatetimeInput!) {
		createDatetime(input: $input) {
			datetime {
				id
				name
				description
				startDate
				endDate
			}
		}
	}
`;

const useCreateDateMutation = () => useMutation(CREATE_DATE);

export default useCreateDateMutation;
