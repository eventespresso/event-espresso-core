import gql from 'graphql-tag';

export const CREATE_DATE = gql`
	mutation createDatetime($input: CreateDatetimeInput!) {
		createDatetime(input: $input) {
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

export const UPDATE_DATE = gql`
	mutation updateDatetime($input: UpdateDatetimeInput!) {
		updateDatetime(input: $input) {
			datetime {
				id
				name
			}
		}
	}
`;

export const DELETE_DATETIME = gql`
	mutation deleteDatetime($input: DeleteDatetimeInput!) {
		deleteDatetime(input: $input) {
			datetime {
				id
			}
		}
	}
`;
