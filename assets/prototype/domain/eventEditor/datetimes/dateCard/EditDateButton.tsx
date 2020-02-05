import React, { CSSProperties } from 'react';
import { Button } from '@blueprintjs/core/lib/esm';
import { EditItemButtonProps } from '../../types';
import { useDatetimeContext } from '../../hooks';
import { useEditorModal } from '../../../../application/ui/components/layout/editorModal';

const EditDateButton: React.FC<EditItemButtonProps> = ({ position }): JSX.Element => {
	const { id: entityId } = useDatetimeContext();

	const { openEditor } = useEditorModal();

	const onClick = (): void =>
		openEditor({
			editorId: 'editDatetime',
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

export default EditDateButton;
