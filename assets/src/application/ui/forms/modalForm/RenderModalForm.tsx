import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonProps } from '@infraUI/inputs';
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
			isDisabled: submitDisabled,
			type: 'submit',
			isLoading: submitting,
			icon: SaveOutlined,
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
