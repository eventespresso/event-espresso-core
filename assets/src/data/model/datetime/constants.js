import { values } from 'lodash';

export const MODEL_NAME = 'datetime';

export const DATETIME_STATUS_ID = {
	ACTIVE: 'DTA',
	CANCELLED: 'DTC',
	EXPIRED: 'DTE',
	INACTIVE: 'DTI',
	POSTPONED: 'DTP',
	SOLD_OUT: 'DTS',
	TRASHED: 'DTT',
	UPCOMING: 'DTU',
};

export const DATETIME_STATUS_IDS = values( DATETIME_STATUS_ID );

export const MINUTE_IN_SECONDS = 60;
export const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
export const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;
export const WEEK_IN_SECONDS = HOUR_IN_SECONDS * 7;
export const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
