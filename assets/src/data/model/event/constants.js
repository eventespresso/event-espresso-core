/**
 * External imports
 */
import { values } from 'lodash';

export const MODEL_NAME = 'event';

export const EVENT_STATUS_ID = {
	SOLD_OUT: 'sold_out',
	POSTPONED: 'postponed',
	CANCELLED: 'cancelled',
};

export const EVENT_STATUS_IDS = values( EVENT_STATUS_ID );
