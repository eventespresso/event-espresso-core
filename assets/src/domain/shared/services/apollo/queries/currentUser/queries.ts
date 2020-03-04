import gql from 'graphql-tag';

export const GET_CURRENT_USER: any = gql`
	query GET_CURRENT_USER {
		viewer {
			description
			email
			firstName
			id
			name
			nicename
			nickname
			lastName
			locale
			userId
			username
		}
	}
`;
