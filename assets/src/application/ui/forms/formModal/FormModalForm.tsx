import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { ButtonProps } from 'antd/lib/button';
import { SaveOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { FormModalFormProps } from './types';

const modalStyle: CSSProperties = {
	boxSizing: 'border-box',
	maxHeight: '90%',
	maxWidth: '1200px',
	minHeight: '50%',
	minWidth: '320px',
	width: '80%',
	overflowY: 'scroll',
	position: 'absolute' as 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
};

const FormModalForm: React.FC<FormModalFormProps> = ({
	form,
	submitting,
	hasValidationErrors,
	hasSubmitErrors,
	pristine,
	onClose,
	children,
	title,
}) => {
	const submitDisabled = submitting || pristine || hasValidationErrors || hasSubmitErrors;

	const submitButton: ButtonProps = {
		disabled: submitDisabled,
		htmlType: 'submit',
		icon: <SaveOutlined />,
		onClick: (click) => {
			click.preventDefault();
			form.submit();
			onClose(click);
		},
	};

	const resetButton: ButtonProps = {
		disabled: submitting || pristine,
		htmlType: 'reset',
		onClick: (click) => {
			click.preventDefault();
			form.reset();
		},
	};

	return (
		<Modal
			title={title}
			visible={true}
			onOk={onClose}
			style={modalStyle}
			okText={__('Submit')}
			okButtonProps={submitButton}
			cancelText={__('Reset')}
			cancelButtonProps={resetButton}
			onCancel={onClose}
			width={'80%'}
		>
			{children}
		</Modal>
	);
};

export default FormModalForm;
