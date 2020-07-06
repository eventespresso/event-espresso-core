import gql from 'graphql-tag';

export const GET_CURRENT_USER: any = gql`
	query GET_CURRENT_USER {
		viewer {
			id
			databaseId
			description
			email
			firstName
			lastName
			locale
			name
			nicename
			nickname
			username
		}
	}
`;
