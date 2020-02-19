import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { EditItemButtonProps } from '../../../interfaces/types';
import { useDatetimeContext } from '../../../hooks';
import { useEditorModal } from '../../../../../application/ui/layout/editorModal';

const EditDateButton: React.FC<EditItemButtonProps> = ({ ...rest }) => {
	const { id: entityId } = useDatetimeContext();

	const { openEditor } = useEditorModal();

	const onClick = (): void =>
		openEditor({
			editorId: 'editDatetime',
			entityId,
		});

	return (
		<EspressoButton
			icon='edit'
			tooltip={__('edit datetime')}
			tooltipProps={{ placement: 'right' }}
			onClick={onClick}
			{...rest}
		/>
	);
};

export default EditDateButton;
