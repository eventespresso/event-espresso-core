import React from 'react';

import '../interfaces/types';
import '@application/ui/styles/themes/default/index.scss';
import EventEditor from './EventEditor';
import { ContextProviders } from '../services/context/EventEditorContext';
import { renderDomElement } from '@appServices/utilities';

const setupEditor = (): void => {
	const Editor: React.FC = () => (
		<ContextProviders>
			<EventEditor />
		</ContextProviders>
	);
	renderDomElement({
		appendToTarget: false,
		domElementToRender: <Editor />,
		containerID: 'ee-event-editor',
		containerClassName: 'ee-editor-container',
		targetElementID: 'normal-sortables',
	});
};

setupEditor();
