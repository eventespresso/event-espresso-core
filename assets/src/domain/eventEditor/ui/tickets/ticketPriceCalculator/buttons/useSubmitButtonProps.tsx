import { useCallback, useMemo } from 'react';
import { anyPass, isEmpty, isNil } from 'ramda';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';

import { useOnSubmitPrices } from '../hooks';
import { useTPCContext } from '../context';

const useSubmitButtonProps = (): ButtonProps => {
	const {
		onClose,
		dataState: { prices },
	} = useTPCContext();

	const isDisabled = prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));

	const submitPrices = useOnSubmitPrices();
	const onClick = useCallback(
		(e) => {
			e.preventDefault();
			submitPrices();
			onClose();
		},
		[submitPrices, onClose]
	);

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Submit'),
			isDisabled,
			onClick,
			type: 'submit',
		}),
		[isDisabled, onClick]
	);
};

export default useSubmitButtonProps;
