/**
 * External imports
 */
import ReactDOM from 'react-dom';

import { EventDatesAndTicketsMetabox } from '@eventespresso/editor';

const container = document.getElementById( 'normal-sortables' );
const editor = document.createElement( 'div' );
container.prepend( editor );

ReactDOM.render(
	<EventDatesAndTicketsMetabox
		eventId={ window.eeEditorEventId }
		eventDates={ window.eeEditorEventDatesList }
	/>,
	editor
	// document.getElementById( 'normal-sortables' )
	// document.getElementById( 'espresso_events_Pricing_Hooks_pricing_metabox_metabox' )
	// document.getElementById( 'event-and-ticket-form-content' )
	// document.getElementById( 'ee-editor-event-dates-and-tickets-metabox' )
);
