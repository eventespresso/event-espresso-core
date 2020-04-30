import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps, ButtonType } from '@appInputs/Button';

import { ConfirmClose } from '@appDisplay/confirm';
import { ModalWithAlert } from '@appLayout/modal';
import { modalCloseButtonProps } from '@infraUI/layout/modal';
import { SaveOutlined } from '@appDisplay/icons/svgs';

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

	const closeButton = !pristine && <ConfirmClose buttonProps={modalCloseButtonProps} onConfirm={onClose} />;

	const submitButtonProps: ButtonProps = useMemo(
		() => ({
			buttonText: __('Submit'),
			buttonType: ButtonType.PRIMARY,
			icon: SaveOutlined,
			isDisabled: submitDisabled,
			isLoading: submitting,
			onClick: onSubmit,
			type: 'submit',
		}),
		[submitDisabled, submitting, onSubmit]
	);

	const resetButtonProps: ButtonProps = useMemo(
		() => ({
			buttonText: __('Reset'),
			isDisabled: submitting || pristine,
			onClick: onReset,
			type: 'reset',
		}),
		[submitting, pristine, onReset]
	);

	return (
		<ModalWithAlert
			bodyClassName='ee-modal-form__body'
			cancelButtonProps={resetButtonProps}
			className='ee-modal-form'
			closeButton={closeButton}
			isOpen={true}
			onClose={onClose}
			showAlertOnEscape={!pristine}
			submitButtonProps={submitButtonProps}
			title={title}
		>
			{children}
		</ModalWithAlert>
	);
};

export default RenderModalForm;
