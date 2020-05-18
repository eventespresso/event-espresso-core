import { GraphQLError } from 'graphql';

import { ReadQueryOptions } from '@dataServices/apollo/queries';
import { GeneralSettingsData } from '@application/valueObjects/config/types';
import { GET_GENERAL_SETTINGS } from '..';

export const request: ReadQueryOptions = {
	query: GET_GENERAL_SETTINGS,
};

export const generalSettings = {
	dateFormat: 'F j, Y',
	timeFormat: 'g:i a',
	timezone: 'Asia/Kolkata',
	__typename: 'GeneralSettings',
};

export const data: GeneralSettingsData = {
	generalSettings,
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
