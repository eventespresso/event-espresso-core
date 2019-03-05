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
