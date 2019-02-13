/**
 * External imports
 */
import ReactDOM from 'react-dom';

import { EventDatesAndTicketsMetabox } from './';

const container = document.getElementById( 'normal-sortables' );
const editor = document.createElement( 'div' );
editor.className = 'ee-editor-div';
container.prepend( editor );

ReactDOM.render(
	<EventDatesAndTicketsMetabox
		eventId={ window.eeEditorEventId }
	/>,
	editor
);
