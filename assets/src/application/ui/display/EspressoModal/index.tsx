import React, { useCallback } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfirmClose } from '@application/ui/input/confirm';
import { Dialog } from '@reach/dialog';
import { Button, message } from 'antd';

import './style.scss';

const EspressoModal = ({ cancelButtonProps, cancelText, children, okButtonProps, okText, onClose, title }) => {
	const onDismiss = useCallback(() => {
		message.config({
			top: 40,
		});

		message.error('This is an error message');
	}, []);

	const footer = (
		<div className='modal__footer'>
			<Button {...cancelButtonProps}>{cancelText}</Button>
			<Button okType='primary' {...okButtonProps}>
				{okText}
			</Button>
		</div>
	);

	return (
		<Dialog isOpen={true} onDismiss={onDismiss} aria-label='Warning about next steps'>
			<ConfirmClose onConfirm={onClose}>
				<button type='button' aria-label='Close' className='ant-modal-close'>
					<span className='ant-modal-close-x'>
						<CloseOutlined />
					</span>
				</button>
			</ConfirmClose>
			<div className='modal__header'>
				<div className='ant-modal-title'>{title}</div>
			</div>
			{children}
			{footer}
		</Dialog>
	);
};

export default EspressoModal;
