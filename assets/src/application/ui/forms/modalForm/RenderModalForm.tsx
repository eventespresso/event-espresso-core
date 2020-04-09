import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { SaveOutlined } from '@ant-design/icons';
import { Modal } from '@infraUI/layout/modal';
import { ButtonProps } from '@infraUI/inputs';

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

	const onSubmit = useCallback(
		(click) => {
			click.preventDefault();
			form.submit();
			onClose(click);
		},
		[form.submit, onClose]
	);

	const onReset = useCallback(() => form.reset(), [form.reset]);

	const submitButtonProps: ButtonProps = useMemo(
		() => ({
			isDisabled: submitDisabled,
			type: 'submit',
			isLoading: submitting,
			leftIcon: () => <SaveOutlined />,
			onClick: onSubmit,
			buttonText: __('Submit'),
		}),
		[submitDisabled, submitting, onSubmit]
	);

	const resetButtonProps: ButtonProps = useMemo(
		() => ({
			isDisabled: submitting || pristine,
			type: 'reset',
			onClick: onReset,
			buttonText: __('Reset'),
		}),
		[submitting, pristine, onReset]
	);

	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			className='ee-modal-form'
			bodyClassName='ee-modal-form__body'
			submitButtonProps={submitButtonProps}
			cancelButtonProps={resetButtonProps}
			title={title}
		>
			{children}
		</Modal>
	);
};

export default RenderModalForm;
