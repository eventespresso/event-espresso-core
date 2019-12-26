/**
 * External imports
 */
import { render } from 'react-dom';

/**
 * Internal imports
 */
import './types';
import EventEditor from './EventEditor';
import { ContextProviders } from './context/ContextProviders';

const container = document.getElementById('normal-sortables');

// create and place our 'ee-editor-div' div before that
const editor = document.createElement('div');

editor.className = 'ee-editor-div-prototype';

container.prepend(editor);

const Editor = () => (
	<ContextProviders>
		<EventEditor />
	</ContextProviders>
);

render(<Editor />, editor);
