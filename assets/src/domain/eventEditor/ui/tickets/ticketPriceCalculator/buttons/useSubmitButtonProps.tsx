import { useCallback, useMemo } from 'react';
import { anyPass, isEmpty, isNil } from 'ramda';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';

import { Prices } from '../data/types';
import { useOnSubmitPrices } from '../hooks';

interface Props extends Prices {
	onCloseModal: VoidFunction;
}

const useSubmitButtonProps = ({ onCloseModal, prices }: Props): ButtonProps => {
	const isDisabled = prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));

	const submitPrices = useOnSubmitPrices();
	const onClick = useCallback(
		(e) => {
			e.preventDefault();
			submitPrices();
			onCloseModal();
		},
		[submitPrices, onCloseModal]
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
