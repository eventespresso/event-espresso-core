/**
 * External imports
 */
import {
	EventSchema,
	DateTimeSchema,
} from '@test/fixtures';
import {
	eventFactory,
	dateTimeFactory,
} from '../../../test/fixtures/base';

export const mockStateForTests = {
	schema: {
		event: EventSchema,
		datetime: DateTimeSchema,
	},
	factory: {
		event: eventFactory,
		datetime: dateTimeFactory,
	},
};
