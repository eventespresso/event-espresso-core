import React, { useCallback } from 'react';
import { ButtonProps } from 'antd/lib/button';

type Props = {
	reset: () => void;
};

const resetButtonProps = ({ reset }: Props): ButtonProps => ({
	htmlType: 'reset',
	onClick: useCallback(
		(click) => {
			click.preventDefault();
			reset();
		},
		[reset]
	),
});

export default resetButtonProps;
