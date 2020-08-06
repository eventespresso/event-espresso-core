import React, { useCallback } from 'react';

import Popup from './Popup';
import ExitSurveyModal from './ExitSurveyModal';
import { useDisclosure } from '@chakra-ui/core';

type ExitSurveyProps = {
	deactivationUrl: string;
};

const ExitSurvey: React.FC<ExitSurveyProps> = ({ deactivationUrl }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const deactivatePlugin = useCallback(() => {
		window.location.href = deactivationUrl;
	}, [deactivationUrl]);

	const onSubmit = useCallback<VoidFunction>(() => {
		// close modal
		onClose();
		// deactivate the plugin
		deactivatePlugin();
	}, [deactivatePlugin, onClose]);

	return (
		<>
			<Popup onOk={onOpen} onSkip={deactivatePlugin} />
			<ExitSurveyModal isOpen={isOpen} onSubmit={onSubmit} />
		</>
	);
};

export default ExitSurvey;
