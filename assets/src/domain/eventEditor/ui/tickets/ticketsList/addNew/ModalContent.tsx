import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoForm } from '@application/ui/forms/espressoForm';
import useTicketFormConfig from '../../ticketForm/useTicketFormConfig';
import ContentWrapper from './ContentWrapper';
import { useTicketMutator } from '@edtrServices/apollo';

type ModalContentProps = {
	onClose: VoidFunction;
};

const ModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
	const { createEntity } = useTicketMutator();
	const onSubmit = useCallback(
		(fields) => {
			createEntity(fields);
			onClose();
		},
		[createEntity]
	);
	const formConfig = useTicketFormConfig(null, { onSubmit });

	return <EspressoForm {...formConfig} formWrapper={ContentWrapper} />;
};

export default ModalContent;
