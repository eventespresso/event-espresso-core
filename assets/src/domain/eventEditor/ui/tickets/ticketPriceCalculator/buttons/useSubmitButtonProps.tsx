import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

import { useTPCContext } from '../context';
import { useOnSubmitPrices } from '../hooks';

const useSubmitButtonProps = useCallback((): ButtonProps => {
	const { onCloseModal } = useTPCContext();
	const submitPrices = useOnSubmitPrices();

	const onClick = (e) => {
		e.preventDefault();
		submitPrices();
		onCloseModal();
	};

	return {
		htmlType: 'reset',
		onClick,
	};
}, []);

export default useSubmitButtonProps;
