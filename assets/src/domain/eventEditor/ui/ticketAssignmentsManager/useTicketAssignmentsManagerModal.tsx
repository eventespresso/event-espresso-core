import React, { useState, useEffect, useCallback } from 'react';
import TicketAssignmentsManager from './TicketAssignmentsManager';
import { EntityId } from '@appServices/apollo/types';
import { useEditorModal, EditorModal, ModalClose } from '@appLayout/editorModal';

const useTicketAssignmentsManagerModal: EditorModal = (entityId: EntityId, otherOptions) => {
	const { closeEditor } = useEditorModal();

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('ticketPriceCalculator');
	}, [closeEditor]);

	const onSubmit = (values?: any) => console.log(values);

	const formComponent = React.memo(() => {
		return <TicketAssignmentsManager entityId={entityId} options={otherOptions} />;
	});

	return {
		formComponent,
		onSubmit,
		initialValues: {},
		onClose,
	};
};

export default useTicketAssignmentsManagerModal;
