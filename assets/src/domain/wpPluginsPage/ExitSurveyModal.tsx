import React from 'react';

import { Modal } from '@wordpress/components';
import ExitSurveyContent from './ExitSurveyContent';
import './styles.scss';

type ExitSurveyModalProps = {
	onSubmit: VoidFunction;
	isOpen: boolean;
};

const ExitSurveyModal: React.FC<ExitSurveyModalProps> = ({ onSubmit, isOpen }) => {
	return (
		isOpen && (
			<Modal
				className='ee-exit-modal__body'
				isDismissible={false}
				onRequestClose={onSubmit}
				overlayClassName='ee-exit-modal__overlay'
				shouldCloseOnClickOutside={false}
				shouldCloseOnEsc={false}
				title={null}
			>
				<ExitSurveyContent onSubmit={onSubmit} />
			</Modal>
		)
	);
};

export default ExitSurveyModal;
