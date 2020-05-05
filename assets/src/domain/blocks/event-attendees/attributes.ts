import { Block } from '@wordpress/blocks';

import { EventAttendeesAttributes } from './types';

const attributes: Block<EventAttendeesAttributes>['attributes'] = {
	event: {
		type: 'string',
		default: '',
	},
	datetime: {
		type: 'string',
		default: '',
	},
	ticket: {
		type: 'string',
		default: '',
	},
	status: {
		type: 'string',
		default: 'RAP',
	},
	limit: {
		type: 'number',
		default: 100,
	},
	order: {
		type: 'string',
		default: 'ASC',
	},
	orderBy: {
		type: 'string',
		default: 'lastThenFirstName',
	},
	showGravatar: {
		type: 'boolean',
		default: false,
	},
	avatarClass: {
		type: 'string',
		default: 'contact',
	},
	avatarSize: {
		type: 'number',
		default: 24,
	},
	displayOnArchives: {
		type: 'boolean',
		default: false,
	},
};

export default attributes;
