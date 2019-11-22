/**
 * External imports
 */
import { render } from '@wordpress/element';

/**
 * Internal imports
 */
import EventEditor from './EventEditor';
import ContextProviders
	from '../../infrastructure/services/contextProviders/ContextProviders';

const container = document.getElementById( 'normal-sortables' );

// create and place our 'ee-editor-div' div before that
const editor = document.createElement( 'div' );

editor.className = 'ee-editor-div-prototype';

container.prepend( editor );

// then load the editor data we dumped into DOM and render theEventEditor
const eventData = window.eeEditorEventData;
const { eventId } = eventData;

if ( eventId ) {
	render(
		<ContextProviders>
			<EventEditor eventId={ eventId }/>
		</ContextProviders>,
		editor
	);
}
