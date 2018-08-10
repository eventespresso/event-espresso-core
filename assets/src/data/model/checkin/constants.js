/**
 * External imports
 */
import { values } from 'lodash';

export const MODEL_NAME = 'checkin';

export const CHECKIN_STATUS_ID = {
	STATUS_CHECKED_OUT: 0,
	STATUS_CHECKED_IN: 1,
	STATUS_CHECKED_NEVER: 2,
};

export const CHECKIN_STATUS_IDS = values(
	CHECKIN_STATUS_ID
);
