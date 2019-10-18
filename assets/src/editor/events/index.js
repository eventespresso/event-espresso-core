/**
 * External imports
 */
import { render } from '@wordpress/element';

/**
 * Internal imports
 */
import EventEditor from './event-editor';

// find the 'normal-sortables' metabox
const container = document.getElementById( 'normal-sortables' );
// create and place our 'ee-editor-div' div before that
const editor = document.createElement( 'div' );
editor.className = 'ee-editor-div';
container.prepend( editor );
// then load the editor data we dumped into DOM and render theEventEditor
const eventData = window.eeEditorEventData;
if ( eventData.eventId ) {
	render(
		<EventEditor eventId={ eventData.eventId } eventData={ eventData } />,
		editor
	);
}
