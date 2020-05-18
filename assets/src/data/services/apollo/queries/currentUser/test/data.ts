import { GraphQLError } from 'graphql';

import { ReadQueryOptions } from '@dataServices/apollo/queries';
import { Viewer } from '@application/valueObjects/config/types';
import { GET_CURRENT_USER } from '..';

export const request: ReadQueryOptions = {
	query: GET_CURRENT_USER,
};

export const currentUser = {
	description: null,
	email: 'user@eventespresso.com',
	firstName: null,
	id: 'dXNlcjox',
	name: 'admin',
	nicename: 'admin',
	nickname: 'admin',
	lastName: null,
	locale: 'en_US',
	userId: 1,
	username: 'admin',
	__typename: 'User',
};

export const data: Viewer = {
	viewer: currentUser,
};

const errors = [new GraphQLError('Error!')];

export const successMocks = [
	{
		request,
		result: { data },
	},
];

export const errorMocks = [
	{
		// modify request to simulate error
		request: {
			...request,
			variables: {},
		},
		result: { errors },
		error: new Error('ERROR!'),
	},
];
