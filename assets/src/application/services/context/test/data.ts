import { GET_CURRENT_USER } from '@dataServices/apollo/queries/currentUser';
import { GET_GENERAL_SETTINGS } from '@dataServices/apollo/queries/generalSettings';
import { mockEspressoDomData } from '../../config/test/data';
import { MockedResponse } from '@edtrServices/context/TestContext/types';

export const configMocks: ReadonlyArray<MockedResponse> = [
	{
		request: {
			query: GET_CURRENT_USER,
			variables: {},
		},
		result: {
			data: {
				viewer: mockEspressoDomData.config.currentUser,
			},
		},
	},
	{
		request: {
			query: GET_GENERAL_SETTINGS,
			variables: {},
		},
		result: {
			data: {
				generalSettings: mockEspressoDomData.config.generalSettings,
			},
		},
	},
];
