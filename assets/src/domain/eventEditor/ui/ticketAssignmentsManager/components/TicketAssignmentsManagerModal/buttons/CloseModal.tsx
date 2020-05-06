import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { ConfirmClose } from '@appDisplay/confirm';
import { modalCloseButtonProps } from '@infraUI/layout/modal';
import { useTAMContext } from '../../../context';

const CloseModal: React.FC = () => {
	const { dataState, onCloseModal } = useTAMContext();

	const { hasOrphanEntities } = dataState;

	const hasErrors = hasOrphanEntities();

	const onConfirm = useCallback(onCloseModal, [hasErrors]);

	return hasErrors ? (
		<ConfirmClose buttonProps={modalCloseButtonProps} onConfirm={onConfirm} />
	) : (
		<Button {...modalCloseButtonProps} onClick={onCloseModal} />
	);
};

export default React.memo(CloseModal);
