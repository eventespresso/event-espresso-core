import React, { useCallback, useState } from 'react';
import { Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type PopupProps = {
	onOk: VoidFunction;
	onSkip: VoidFunction;
};

const Popup: React.FC<PopupProps> = ({ onOk, onSkip }) => {
	const [isOpen, setIsOpen] = useState(true);
	const closePopup: VoidFunction = () => setIsOpen(false);

	const onOkHandler = useCallback(() => {
		if (typeof onOk === 'function') {
			onOk();
		}
		closePopup();
	}, [onOk]);

	const onSkipHandler = useCallback(() => {
		if (typeof onSkip === 'function') {
			onSkip();
		}
		closePopup();
	}, [onOk]);

	const title = __('Do you have a moment to share why you are deactivating Event Espresso?');

	return (
		isOpen && (
			<Modal
				isDismissible={false}
				onRequestClose={closePopup}
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
