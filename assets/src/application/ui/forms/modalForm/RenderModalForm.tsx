import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { SaveOutlined } from '@ant-design/icons';

import { ButtonProps } from '@infraUI/inputs';
import { Close } from '@appDisplay/icons';
import { ConfirmClose } from '@appDisplay/confirm';
import { Modal } from '@infraUI/layout/modal';

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

	const closeButton = (
		<ConfirmClose buttonProps={{ className: 'confirm-close', icon: Close, variant: 'unstyled' as 'unstyled' }} />
	);

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
			bodyClassName='ee-modal-form__body'
			cancelButtonProps={resetButtonProps}
			className='ee-modal-form'
			closeButton={closeButton}
			isOpen={true}
			onClose={onClose}
			submitButtonProps={submitButtonProps}
			title={title}
		>
			{children}
		</Modal>
	);
};

export default RenderModalForm;
