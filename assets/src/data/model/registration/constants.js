/**
 * Internal Imports
 */
import * as statusModel from '../status/constants';

/**
 * External imports
 */
import { values } from 'lodash';

export const REGISTRATION = 'registration';
export const REGISTRATIONS = 'registrations';

export const REGISTRATION_STATUS_IDS = values(
	statusModel.REGISTRATION_STATUS_ID
);
