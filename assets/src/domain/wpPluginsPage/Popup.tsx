import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@infraUI/display';
import { Button, ButtonType } from '@application/ui/input';

type PopupProps = {
	onOk: VoidFunction;
	onSkip: VoidFunction;
};

const Popup: React.FC<PopupProps> = ({ onOk, onSkip }) => {
	const { isOpen, onClose } = useDisclosure(true);
	const cancelRef = React.useRef();

	const onOkHandler = useCallback(() => {
		if (typeof onOk === 'function') {
			onOk();
		}
		onClose();
	}, [onOk]);

	const onSkipHandler = useCallback(() => {
		if (typeof onSkip === 'function') {
			onSkip();
		}
		onClose();
	}, [onOk]);

	const skipButton = <Button buttonText={__('Skip')} ref={cancelRef} onClick={onSkipHandler} />;

	const okButton = (
		<Button buttonText={__("Sure I'll help")} buttonType={ButtonType.ACCENT} onClick={onOkHandler} ml={3} />
	);

	const header = __('Do you have a moment to share why you are deactivating Event Espresso?');

	return (
		<AlertDialog
			cancelButton={skipButton}
			header={header}
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			okButton={okButton}
			onClose={onClose}
		/>
	);
};

export default Popup;
