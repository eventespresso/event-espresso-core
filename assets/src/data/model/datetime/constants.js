import { values } from 'lodash';

export const MODEL_NAME = 'datetime';

export const DATETIME_STATUS_ID = {
	SOLD_OUT: 'DTS',
	ACTIVE: 'DTA',
	UPCOMING: 'DTU',
	POSTPONED: 'DTP',
	CANCELLED: 'DTC',
	EXPIRED: 'DTE',
	INACTIVE: 'DTI',
};

export const DATETIME_STATUS_IDS = values( DATETIME_STATUS_ID );
