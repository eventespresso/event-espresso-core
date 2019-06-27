/**
 * External imports
 */
import { render } from '@wordpress/element';

import { EventDatesAndTicketsMetabox } from './';

const container = document.getElementById( 'normal-sortables' );
const editor = document.createElement( 'div' );
editor.className = 'ee-editor-div';
container.prepend( editor );
const eventId = window.eeEditorEventId;

if ( eventId ) {
	render(
		<EventDatesAndTicketsMetabox eventId={ eventId } />,
		editor
	);
}
