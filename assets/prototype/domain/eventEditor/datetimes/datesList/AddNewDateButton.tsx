import React, { CSSProperties } from 'react';

import { EspressoButton } from '../../../../application/ui/components/input';
import { useEditorModal } from '../../../../application/ui/components/layout/editorModal';

const btnRowStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const AddNewDateButton: React.FC = (): JSX.Element => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addDatetime',
		});
	};

	return (
		<div style={btnRowStyle}>
			<EspressoButton icon={'calendar'} buttonText={'Add New Date'} onClick={onClick} />
		</div>
	);
};

export default AddNewDateButton;
