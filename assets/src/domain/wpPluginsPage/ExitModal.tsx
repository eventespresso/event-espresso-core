import React, { useEffect, useRef } from 'react';
import { pathOr } from 'ramda';
import { addQueryArgs } from '@wordpress/url';
import * as typeformEmbed from '@typeform/embed';

import { ExitModalInfo } from './types';
import { Modal } from '@wordpress/components';
import './styles.scss';

type ExitModalProps = {
	onSubmit: VoidFunction;
	isOpen: boolean;
};

const info = pathOr<ExitModalInfo>(null, ['eejsdata', 'data', 'exitModalInfo'], window);

const ModalContent: React.FC<Partial<ExitModalProps>> = ({ onSubmit }) => {
	const typeFormEl = useRef();
	const typeFormUrl = addQueryArgs('https://eventespresso.typeform.com/to/O1DDym', {
		firstname: info?.firstname,
		emailaddress: info?.emailaddress,
		website: info?.website,
	});

	useEffect(() => {
		typeformEmbed.makeWidget(typeFormEl.current, typeFormUrl, {
			onSubmit: function () {
				onSubmit();
			},
			hideScrollbars: true,
		});
	}, []);

	return <div ref={typeFormEl}></div>;
};

const ExitModal: React.FC<ExitModalProps> = ({ onSubmit, isOpen }) => {
	return (
		isOpen && (
			<Modal
				className='ee-exit-modal__body'
				isDismissible={false}
				onRequestClose={onSubmit}
				overlayClassName='ee-exit-modal'
				shouldCloseOnClickOutside={false}
				shouldCloseOnEsc={false}
				title={null}
			>
				<ModalContent onSubmit={onSubmit} />
			</Modal>
		)
	);
};

export default ExitModal;
