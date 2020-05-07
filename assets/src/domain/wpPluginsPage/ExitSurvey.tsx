import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import Popup from './Popup';
import ExitModal from './ExitModal';

type ExitSurveyProps = {
	deactivationUrl: string;
};

const ExitSurvey: React.FC<ExitSurveyProps> = ({ deactivationUrl }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const deactivatePlugin = useCallback(() => {
		window.location.href = deactivationUrl;
	}, [deactivationUrl]);

	const onOk = useCallback<VoidFunction>(() => {
		// open survey modal
		onOpen();
	}, [onOpen]);

	const onSkip = useCallback<VoidFunction>(() => {
		// deactivate the plugin
		deactivatePlugin();
	}, [deactivatePlugin]);

	const onSubmit = useCallback<VoidFunction>(() => {
		// close modal
		onClose();
		// deactivate the plugin
		deactivatePlugin();
	}, [deactivatePlugin, onClose]);

	return (
		<>
			<Popup onOk={onOk} onSkip={onSkip} />
			<ExitModal isOpen={isOpen} onSubmit={onSubmit} />
		</>
	);
};

export default ExitSurvey;
