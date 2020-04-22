import React from 'react';
import { render } from 'react-dom';

import './services/publicPath';
import './interfaces/types';
import '../../application/ui/styles/themes/default/index.scss';
import EventEditor from './ui/EventEditor';
import { ContextProviders } from './services/context/EventEditorContext';

const container = document.getElementById('normal-sortables');

const editor = document.createElement('div');

editor.className = 'ee-event-editor';

container.prepend(editor);

const Editor: React.FC = () => (
	<ContextProviders>
		<EventEditor />
	</ContextProviders>
);

render(<Editor />, editor);
