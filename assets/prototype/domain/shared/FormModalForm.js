import { useEffect, useState } from '@wordpress/element';
import { EspressoButton } from '../../../ZZZ/components/ui';

const formStyle = {
	boxSizing: 'border-box',
	padding: '1em 2em',
};

const btnRowStyle = {
	boxSizing: 'border-box',
	padding: '1em 2em',
	textAlign: 'right',
};

const dataStyle = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
};

const FormModalForm = ({ FormComponent, form, values, handleSubmit, submitting, pristine, onClose, ...formProps }) => {
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

	return (
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
			<div style={btnRowStyle}>
				<EspressoButton
					icon={'save'}
					type={'submit'}
					style={'primary'}
					buttonText={'Submit'}
					disabled={submitting || pristine}
					onClick={(click) => {
						click.preventDefault();
						form.submit();
						onClose(click);
					}}
				/>
				<EspressoButton
					buttonText={'Reset'}
					disabled={submitting || pristine}
					onClick={(click) => {
						click.preventDefault();
						setFormReset(true);
					}}
				/>
			</div>
			<pre style={dataStyle}>{JSON.stringify(values, 0, 2)}</pre>
		</form>
	);
};

export default FormModalForm;
