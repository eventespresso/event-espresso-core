import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { useTAMContext } from '../context';

const useCancelButtonProps = ({ onOpenErrorModal }): ButtonProps => {
	const { dataState, onCloseModal } = useTAMContext();

	const { hasOrphanEntities } = dataState;

	const hasErrors = hasOrphanEntities();

	const onClick: ButtonProps['onClick'] = useCallback(() => {
		if (hasErrors) {
			onOpenErrorModal();
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
