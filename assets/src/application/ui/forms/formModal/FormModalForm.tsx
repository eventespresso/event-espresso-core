import React, { useEffect, useState, CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { ButtonProps } from 'antd/lib/button';
import { Modal } from 'antd';

import { FormModalFormProps } from './types';

const formStyle: CSSProperties = {
	boxSizing: 'border-box',
	padding: '1em 2em',
};

const dataStyle: CSSProperties = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
};

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
	FormComponent,
	form,
	values,
	handleSubmit,
	submitting,
	pristine,
	onClose,
	...formProps
}) => {
	// boolean for communicating to form child components whether form needs to be reset
	const [formReset, setFormReset] = useState(false);
	// clear form data and set formReset back to false
	// after form child components have had a chance to reset
	// after receiving a positive formReset prop
	useEffect(() => {
		if (formReset) {
			form.reset();
			setFormReset(false);
		}
	});

	const submitButton: ButtonProps = {
		disabled: submitting || pristine,
		htmlType: 'submit',
		icon: 'save',
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
			setFormReset(true);
		},
	};

	return (
		<Modal
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
			<form onSubmit={handleSubmit}>
				<div style={formStyle}>
					<FormComponent
						form={form}
						values={values}
						submitting={submitting}
						pristine={pristine}
						formReset={formReset}
						{...formProps}
					/>
				</div>
				<pre style={dataStyle}>{JSON.stringify(values, null, 2)}</pre>
			</form>
		</Modal>
	);
};

export default FormModalForm;
