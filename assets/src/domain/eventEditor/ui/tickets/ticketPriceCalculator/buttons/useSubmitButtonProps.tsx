import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { anyPass, isEmpty, isNil } from 'ramda';

import { Prices } from '../data/types';
import { useOnSubmitPrices } from '../hooks';

interface Props extends Prices {
	onCloseModal: VoidFunction;
}

const useSubmitButtonProps = ({ onCloseModal, prices }: Props): ButtonProps => {
	const disabled = prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));

	const submitPrices = useOnSubmitPrices();
	const onClick = useCallback(
		(e) => {
			e.preventDefault();
			submitPrices();
			onCloseModal();
		},
		[submitPrices, onCloseModal]
	);

	return {
		disabled,
		htmlType: 'submit',
		onClick,
	};
};

export default useSubmitButtonProps;
