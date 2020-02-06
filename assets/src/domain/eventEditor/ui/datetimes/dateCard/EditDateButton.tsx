import React, { CSSProperties } from 'react';

import { EspressoButton } from '@application/ui/input';
import { EditItemButtonProps } from '../../../interfaces/types';
import { useDatetimeContext } from '../../../hooks';
import { useEditorModal } from '../../../../../application/ui/layout/editorModal';

const EditDateButton: React.FC<EditItemButtonProps> = ({ position }) => {
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
			<EspressoButton icon='edit' onClick={onClick} />
		</div>
	);
};

export default EditDateButton;
