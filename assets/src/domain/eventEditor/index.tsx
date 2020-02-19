/**
 * External imports
 */
import React from 'react';
import { render } from 'react-dom';

/**
 * Internal imports
 */
import './interfaces/types';
import '../../application/ui/styles/themes/default';
import EventEditor from './ui/EventEditor';
import { ContextProviders } from './services/context/EventEditorContext';

const container = document.getElementById('normal-sortables');

// create and place our 'ee-editor-div' div before that
const editor = document.createElement('div');

editor.className = 'ee-editor-div-prototype';

container.prepend(editor);

const Editor: React.FC = () => (
	<ContextProviders>
		<EventEditor />
	</ContextProviders>
);

render(<Editor />, editor);
