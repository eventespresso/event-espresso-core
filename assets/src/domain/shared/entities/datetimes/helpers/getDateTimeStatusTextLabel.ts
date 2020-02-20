import { __ } from '@wordpress/i18n';

import { Datetime } from '@edtrServices/apollo/types';
import status from './status';
import { DATETIME_STATUS_ID } from '../constants';

const getDateTimeStatusTextLabel = (date: Datetime): string => {
	let dateStatus = '';
	switch (status(date)) {
		case DATETIME_STATUS_ID.SOLD_OUT:
			dateStatus = __('sold out', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.EXPIRED:
			dateStatus = __('expired', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.UPCOMING:
			dateStatus = __('upcoming', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.ACTIVE:
			dateStatus = __('active', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.TRASHED:
			dateStatus = __('archived', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.CANCELLED:
			dateStatus = __('cancelled', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.POSTPONED:
			dateStatus = __('postponed', 'event_espresso');
			break;
		case DATETIME_STATUS_ID.INACTIVE:
		default:
			dateStatus = __('inactive', 'event_espresso');
			break;
	}

	return dateStatus;
};

export default getDateTimeStatusTextLabel;
