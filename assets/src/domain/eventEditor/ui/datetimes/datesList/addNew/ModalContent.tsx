import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoForm } from '@application/ui/forms/espressoForm';
import useDateFormConfig from '../../dateForm/useDateFormConfig';
import ContentWrapper from './ContentWrapper';
import { useDatetimeMutator } from '@edtrServices/apollo';

type ModalContentProps = {
	onClose: VoidFunction;
};

const ModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
	const { createEntity } = useDatetimeMutator();
	const onSubmit = useCallback(
		(fields) => {
			createEntity(fields);
			onClose();
		},
		[createEntity]
	);
	const formConfig = useDateFormConfig(null, { onSubmit });

	return <EspressoForm {...formConfig} formWrapper={ContentWrapper} />;
};

export default ModalContent;
