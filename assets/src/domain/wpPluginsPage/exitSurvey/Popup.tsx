import React, { useCallback } from 'react';
import { Button, Modal } from '@wordpress/components';
import { useDisclosure } from '@chakra-ui/hooks';
import { __ } from '@wordpress/i18n';

type PopupProps = {
	onOk: VoidFunction;
	onSkip: VoidFunction;
};

const Popup: React.FC<PopupProps> = ({ onOk, onSkip }) => {
	const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

	const onOkHandler = useCallback(() => {
		if (typeof onOk === 'function') {
			onOk();
		}
		onClose();
	}, [onOk, onClose]);

	const onSkipHandler = useCallback(() => {
		if (typeof onSkip === 'function') {
			onSkip();
		}
		onClose();
	}, [onClose, onSkip]);

	const title = __('Do you have a moment to share why you are deactivating Event Espresso?');

	return (
		isOpen && (
			<Modal
				isDismissible={false}
				onRequestClose={onClose}
				shouldCloseOnClickOutside={false}
				shouldCloseOnEsc={false}
				title={title}
			>
				<Button onClick={onSkipHandler}>{__('Skip')}</Button>
				<Button isPrimary onClick={onOkHandler}>
					{__("Sure I'll help")}
				</Button>
			</Modal>
		)
	);
};

export default Popup;
