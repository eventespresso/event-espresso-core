import React, { CSSProperties } from 'react';
import { Button } from '@blueprintjs/core/lib/esm';

import { EditItemButtonProps } from '../../types';
import { useTicketContext } from '../../hooks';
import { useEditorModal } from '../../../../application/ui/components/layout/eeditorModal';

const EditTicketButton: React.FC<EditItemButtonProps> = ({ position }): JSX.Element => {
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
			<Button icon={'edit'} onClick={onClick} minimal />
		</div>
	);
};

export default EditTicketButton;
