import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_GENERAL_SETTINGS } from './';
import { ReadQueryOptions } from '../types';
import { GeneralSettings } from '../../../../../application/valueObjects/config/types';
/**
 * A custom react hook for retrieving GeneralSettings
 */
const useGeneralSettings = (): GeneralSettings => {
	const client = useApolloClient();
	let data: any;

	try {
		const options: ReadQueryOptions = {
			query: GET_GENERAL_SETTINGS,
		};
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}
	return pathOr<GeneralSettings>(null, ['generalSettings'], data);
};

export default useGeneralSettings;
