import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { SaveOutlined } from '@appDisplay/icons/svgs';
import { useOnSubmitAssignments } from '../../../data';
import { useTAMContext } from '../../../context';

const useSubmitButtonProps = (): ButtonProps => {
	const { dataState, onCloseModal } = useTAMContext();
	const submitAssignments = useOnSubmitAssignments();

	const { hasOrphanEntities, getData } = dataState;

	const hasErrors = hasOrphanEntities();
	const data = getData();

	const onSubmit: ButtonProps['onClick'] = useCallback(
		(e) => {
			e.preventDefault();
			submitAssignments(data);
			onCloseModal();
		},
		[data]
	);

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Submit'),
			icon: SaveOutlined,
			isDisabled: hasErrors,
			onClick: onSubmit,
			type: 'submit',
		}),
		[hasErrors, onSubmit]
	);
};

export default useSubmitButtonProps;
