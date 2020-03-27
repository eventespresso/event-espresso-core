import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

import { useTPCContext } from '../context';

const useResetButtonProps = useCallback((): ButtonProps => {
	const {
		dataState: { reset },
	} = useTPCContext();

	const onClick = (e) => {
		e.preventDefault();
		reset();
	};

	return {
		htmlType: 'reset',
		onClick,
	};
}, []);

export default useResetButtonProps;
