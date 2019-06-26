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
const entityListView = window.eeEditorListView ?
	window.eeEditorListView :
	'grid';
const entityListPerPage = window.eeEditorPerPage ?
	window.eeEditorPerPage :
	6;

if ( eventId ) {
	render(
		<EventDatesAndTicketsMetabox
			eventId={ eventId }
			entityListView={ entityListView }
			entityListPerPage={ entityListPerPage }
		/>,
		editor
	);
}
