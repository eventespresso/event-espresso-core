/**
 * External imports
 */
import ReactDOM from 'react-dom';

import { EventDatesAndTicketsMetabox } from './';

const container = document.getElementById( 'normal-sortables' );
const editor = document.createElement( 'div' );
editor.className = 'ee-editor-div';
container.prepend( editor );
const eventId = window.eeEditorEventId;

if ( eventId ) {
	ReactDOM.render(
		<EventDatesAndTicketsMetabox eventId={ eventId } />,
		editor
	);
}
