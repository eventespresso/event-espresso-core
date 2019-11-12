/**
 * External imports
 */
import { values } from 'lodash';

export const MODEL_NAMES = {
	MODEL: 'checkin',
	RELATION: 'checkins',
};

export const CHECKIN_STATUS_ID = {
	STATUS_CHECKED_OUT: false,
	STATUS_CHECKED_IN: true,
	STATUS_CHECKED_NEVER: 2,
};

export const CHECKIN_STATUS_IDS = values(
	CHECKIN_STATUS_ID
);
