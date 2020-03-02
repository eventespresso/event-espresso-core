import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { useEditorModal } from '@application/ui/layout/editorModal';

const AddNewDateButton: React.FC = () => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addDatetime',
		});
	};

	return <EspressoButton icon={'calendar'} buttonText={__('Add New Date')} onClick={onClick} />;
};

export default AddNewDateButton;
