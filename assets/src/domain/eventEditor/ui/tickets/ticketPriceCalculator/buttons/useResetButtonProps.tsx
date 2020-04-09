import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';

type Props = {
	reset: VoidFunction;
};

const useResetButtonProps = ({ reset }: Props): ButtonProps => {
	const onClick = useCallback(() => reset(), [reset]);

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Reset'),
			onClick,
			type: 'reset',
		}),
		[onClick]
	);
};

export default useResetButtonProps;
