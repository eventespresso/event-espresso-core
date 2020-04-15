import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { useTAMContext } from '../context';

const useCancelButtonProps = (): ButtonProps => {
	const { dataState, onCloseModal } = useTAMContext();

	const { hasOrphanEntities } = dataState;

	const hasErrors = hasOrphanEntities();

	const onClick: ButtonProps['onClick'] = useCallback(() => {
		onCloseModal();
	}, [hasErrors]);

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Cancel'),
			isDisabled: hasErrors,
			onClick,
			type: 'reset',
		}),
		[onClick]
	);
};

export default useCancelButtonProps;
