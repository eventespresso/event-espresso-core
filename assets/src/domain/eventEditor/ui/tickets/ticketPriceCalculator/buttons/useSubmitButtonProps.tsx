import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

type Props = {
	onCloseModal: VoidFunction;
	submitPrices: VoidFunction;
};

const useSubmitButtonProps = ({ onCloseModal, submitPrices }: Props): ButtonProps => {
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
