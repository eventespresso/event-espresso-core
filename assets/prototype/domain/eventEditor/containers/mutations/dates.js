import gql from 'graphql-tag';

export const CREATE_DATE = gql`
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
