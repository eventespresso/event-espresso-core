import React from 'react';
import { __ } from '@wordpress/i18n';
import { ButtonProps } from 'antd/lib/button';
import { SaveOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { RenderModalFormProps } from './types';

const RenderModalForm: React.FC<RenderModalFormProps> = ({
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
		loading: submitting,
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
			bodyStyle={{ padding: 0 }}
			cancelButtonProps={resetButton}
			cancelText={__('Reset')}
			centered
			maskClosable
			okButtonProps={submitButton}
			okText={__('Submit')}
			onCancel={onClose}
			onOk={onClose}
			title={title}
			visible={true}
			width={'80%'}
			wrapClassName='ee-modal ee-modal-form'
			zIndex={1200}
		>
			<div className='form-body'>{children}</div>
		</Modal>
	);
};

export default RenderModalForm;
