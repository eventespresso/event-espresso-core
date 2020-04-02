import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

import { useOnSubmitPrices } from '../hooks';

type Props = {
	onCloseModal: VoidFunction;
};

const useSubmitButtonProps = ({ onCloseModal }: Props): ButtonProps => {
	const submitPrices = useOnSubmitPrices();
	const onClick = useCallback(
		(e) => {
			e.preventDefault();
			submitPrices();
			onCloseModal();
		},
		[submitPrices]
	);

	return {
		htmlType: 'reset',
		onClick,
	};
};

export default useSubmitButtonProps;
