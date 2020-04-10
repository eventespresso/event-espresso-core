import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
import { useDataState } from '../data';

const useResetButtonProps = (): ButtonProps => {
	const { reset } = useDataState();

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Reset'),
			onClick: reset,
			type: 'reset',
		}),
		[reset]
	);
};

export default useResetButtonProps;
