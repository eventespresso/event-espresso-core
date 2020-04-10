import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { useTAMContext } from '../context';

const useCancelButtonProps = (): ButtonProps => {
	const { dataState, onCloseModal } = useTAMContext();

	const { hasOrphanEntities } = dataState;

	const hasErrors = hasOrphanEntities();

	const onClick: ButtonProps['onClick'] = useCallback(() => {
		if (hasErrors) {
			// @todo integrate alert with an alert dialog and <ErrorMessage />
			alert(__('Please fix the errors.'));
		} else {
			onCloseModal();
		}
	}, [hasErrors]);

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Cancel'),
			onClick,
			type: 'reset',
		}),
		[onClick]
	);
};

export default useCancelButtonProps;
