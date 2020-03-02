import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { TagsOutlined } from '@ant-design/icons';

import { EspressoButton } from '@application/ui/input';
import { useEditorModal } from '@application/ui/layout/editorModal';
import useTicketAssignmentsManager from '../../ticketAssignmentsManager/useTicketAssignmentsManager';

const btnRowStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton: React.FC = () => {
	const { openEditor } = useEditorModal();
	const { assignToAll } = useTicketAssignmentsManager();

	const onClickAssignments = (): void => {
		assignToAll();
	};

	const onClickAddNew = (): void => {
		openEditor({
			editorId: 'addDatetime',
		});
	};

	return (
		<div style={btnRowStyle}>
			<EspressoButton icon={'calendar'} buttonText={__('Add New Date')} onClick={onClickAddNew} />
			<EspressoButton
				icon={<TagsOutlined />}
				buttonText={__('Ticket Assignments')}
				onClick={onClickAssignments}
			/>
		</div>
	);
};

export default AddNewDateButton;
