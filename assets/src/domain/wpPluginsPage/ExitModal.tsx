import React, { useRef, useEffect } from 'react';
import { pathOr } from 'ramda';
import { addQueryArgs } from '@wordpress/url';
import * as typeformEmbed from '@typeform/embed';

import { ExitModalInfo } from './types';
import { Modal } from '@infraUI/layout/modal';
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
		console.log('typeFormEl', typeFormEl.current);
		console.log('typeFormUrl', typeFormUrl);
		typeformEmbed.makeWidget(typeFormEl.current, typeFormUrl, {
			onSubmit: function () {
				console.log('Typeform successfully submitted');
				onSubmit();
			},
			hideScrollbars: true,
		});
	}, []);

	return <div style={{ height: '100%' }} ref={typeFormEl}></div>;
};

const ExitModal: React.FC<ExitModalProps> = ({ onSubmit, isOpen }) => {
	return (
		<Modal
			bodyClassName='ee-exit-modal__body'
			className='ee-exit-modal'
			isOpen={isOpen}
			closeButton={() => <span></span>}
			onClose={onSubmit}
		>
			<ModalContent onSubmit={onSubmit} />
		</Modal>
	);
};

export default ExitModal;
