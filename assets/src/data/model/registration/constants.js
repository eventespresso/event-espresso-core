/**
 * Internal Imports
 */
import * as statusModel from '../status/constants';

/**
 * External imports
 */
import { values } from 'lodash';

export const MODEL_NAMES = {
	MODEL: 'registration',
	RELATION: 'registrations',
};

export const REGISTRATION_STATUS_IDS = values(
	statusModel.REGISTRATION_STATUS_ID
);
