import gql from 'graphql-tag';
import { DATETIME_ATTRIBUTES } from '@edtrServices/apollo/queries/datetimes';

export const CREATE_DATETIME = gql`
	mutation CREATE_DATETIME($input: CreateEspressoDatetimeInput!) {
		createEspressoDatetime(input: $input) {
			espressoDatetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const UPDATE_DATETIME = gql`
	mutation UPDATE_DATETIME($input: UpdateEspressoDatetimeInput!) {
		updateEspressoDatetime(input: $input) {
			espressoDatetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const DELETE_DATETIME = gql`
	mutation DELETE_DATETIME($input: DeleteEspressoDatetimeInput!) {
		deleteEspressoDatetime(input: $input) {
			espressoDatetime {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export { default as useDatetimeMutator } from './useDatetimeMutator';

export { default as useReorderDatetimes } from './useReorderDatetimes';

export { default as useUpdateRelatedTickets } from './useUpdateRelatedTickets';

export * from './types';
