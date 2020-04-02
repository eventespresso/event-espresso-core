import { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

type Props = {
	reset: VoidFunction;
};

const useResetButtonProps = ({ reset }: Props): ButtonProps => {
	const onClick = useCallback(
		(e) => {
			e.preventDefault();
			reset();
		},
		[reset]
	);

	return {
		htmlType: 'reset',
		onClick,
	};
};

export default useResetButtonProps;
