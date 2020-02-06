import React, { CSSProperties } from 'react';

import { EspressoButton } from '@application/ui/input';
import { EditItemButtonProps } from '../../../interfaces/types';
import { useTicketContext } from '../../../hooks';
import { useEditorModal } from '../../../../../application/ui/layout/editorModal';

const EditTicketButton: React.FC<EditItemButtonProps> = ({ position }) => {
	const { id: entityId } = useTicketContext();

	const { openEditor } = useEditorModal();

	const onClick = (): void =>
		openEditor({
			editorId: 'editTicket',
			entityId,
		});

	const style: CSSProperties = {
		position: 'absolute',
		right: '.5rem',
		textAlign: 'right',
		zIndex: 1,
		...(position === 'top' && {
			top: '.5rem',
		}),
	};

	return (
		<div style={style}>
			<EspressoButton icon='edit' onClick={onClick} />
		</div>
	);
};

export default EditTicketButton;
