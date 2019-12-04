import gql from 'graphql-tag';
import { DATETIME_ATTRIBUTES } from '../queries/dates';

export const CREATE_DATE = gql`
	mutation createDatetime($input: CreateDatetimeInput!) {
		createDatetime(input: $input) {
			datetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const UPDATE_DATE = gql`
	mutation updateDatetime($input: UpdateDatetimeInput!) {
		updateDatetime(input: $input) {
			datetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
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
