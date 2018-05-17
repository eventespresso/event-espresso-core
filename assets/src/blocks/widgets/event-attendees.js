import { __ } from '@wordpress/i18n';
import { data } from '@eventespresso/eejs';
import { EventSelect } from '../../components/selection/event-select/index';

const { registerBlockType } = wp.blocks;
const { Component } = wp.element;

class eventespressoEventAttendeesBlock extends Component
{

	static initialize( selectedEvent ) {
		return {
			events: [],
			selectedEvent: selectedEvent,
			event: {},
		};
	}

	constructor() {
		super( ...arguments );
		this.state = this.constructor.initialize( this.props.attributes.selectedEvent );
	}

	render() {
		return EventSelect;
	}

}

registerBlockType(
	'eventespresso/widgets-event-attendees',
	{
		title: __( 'Event Attendees', 'event_espresso' ),
		description: __(
			'Displays a list of people that have registered for the specified event',
			'event_espresso',
		),
		icon: 'groups',
		category: 'widgets',
		keywords: [
			__( 'event', 'event_espresso' ),
			__( 'attendees', 'event_espresso' ),
			__( 'list', 'event_espresso' ),
		],
		useOnce: false,
		supports: {
			anchor: true,
		},
		selectedEvent: {
			type: 'number',
			default: 0,
		},
		edit: eventespressoEventAttendeesBlock,
		save() {
			return null;
		},

		// attributes: {
		//     content: {
		//         source:   'children',
		//         selector: 'p',
		//         type:     'string',
		//     },
		// },
		// The "edit" property must be a valid function.
		// edit: function(props) {
		//     return (
		//         <div className={props.className}>
		//           <p>Event Editor</p>
		//         </div>
		//     );
		// },
		// The "save" property must be specified and must be a valid function.
		// <p>props.attributes.id</p>
		// save: function(props) {
		//     return (
		//         <div className={props.className}>
		//             <p>Next Upcoming Event Datetime</p>
		//         </div>
		//     );
		// },
	},
);