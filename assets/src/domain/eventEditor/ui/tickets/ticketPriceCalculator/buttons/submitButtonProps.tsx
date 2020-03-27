import React, { useCallback } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/lib/button';

type Props = {
	onCloseModal: () => void;
	submitPrices: () => void;
};

const submitButtonProps = ({ onCloseModal, submitPrices }: Props): ButtonProps => ({
	htmlType: 'submit',
	icon: <SaveOutlined />,
	onClick: useCallback(
		(click) => {
			click.preventDefault();
			submitPrices();
			onCloseModal();
		},
		[onCloseModal, submitPrices]
	),
});

export default submitButtonProps;
