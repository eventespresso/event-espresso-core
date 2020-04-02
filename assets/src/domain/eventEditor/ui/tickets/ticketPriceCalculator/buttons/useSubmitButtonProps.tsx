import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

import { useOnSubmitPrices } from '../hooks';

type Props = {
	onCloseModal: VoidFunction;
	price: number;
};

const useSubmitButtonProps = ({ onCloseModal, price }: Props): ButtonProps => {
	const disabled = price === 0;
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
