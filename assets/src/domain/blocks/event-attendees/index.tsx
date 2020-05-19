import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import { canUseDOM, domReady } from '@appServices/utilities/dom';

import attributes from './attributes';
import EventAttendeesEdit from './edit';
import type { EventAttendeesAttributes } from './types';
import './style.scss';

const registerEventAttendeesBlock: VoidFunction = () => {
	registerBlockType<EventAttendeesAttributes>('eventespresso/event-attendees', {
		title: __('Event Attendees', 'event_espresso'),
		description: __('Displays a list of people that have registered for the specified event', 'event_espresso'),
		icon: 'groups',
		category: 'event-espresso',
		keywords: [__('event', 'event_espresso'), __('attendees', 'event_espresso'), __('list', 'event_espresso')],
		attributes,
		edit: EventAttendeesEdit,
		save() {
			return null;
		},
		// TODO migrate attributes to use GUID
	});
};

canUseDOM && domReady(registerEventAttendeesBlock);
