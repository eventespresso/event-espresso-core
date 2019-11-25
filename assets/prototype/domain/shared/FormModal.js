import classNames from 'classnames';
import { Classes, Overlay } from '@blueprintjs/core/lib/esm';
import { Form } from 'react-final-form';
import { EspressoButton } from '../../../ZZZ/components/ui';

const FormModal = ({
	FormComponent,
	initialValues,
	onSubmit,
	onClose,
	isOpen,
	...extraProps
}) => {
	const overlayProps = {
		autoFocus: true,
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		usePortal: true,
		useTallContent: false
	};

	const classes = classNames(Classes.CARD, Classes.ELEVATION_4);

	const overlayStyle = {
		boxSizing: 'border-box',
		maxHeight: '90%',
		maxWidth: '900px',
		minHeight: '50%',
		minWidth: '320px',
		width: '80%',
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	};

	const formStyle = {
		boxSizing: 'border-box',
		padding: '1em 2em',
	};

	const btnRowStyle = {
		boxSizing: 'border-box',
		padding: '1em 2em',
		textAlign: 'right'
	};

	const dataStyle = {
		borderRadius: '5px',
		boxSizing: 'border-box',
		padding: '1em 2em',
		color: '#a9ce47',
		backgroundColor: '#26203d',
	};

	console.log( '%c FormModal', 'color: #1BE7FF;' );
	console.log( '%c > initialValues:', 'color: #99c043;', initialValues );
	return (
		<Overlay
			{...overlayProps}
			className={Classes.OVERLAY_SCROLL_CONTAINER}
			onClose={onClose}
			isOpen={isOpen}
		>
			<div className={classes} style={overlayStyle}>
				<Form
					onSubmit={onSubmit}
					initialValues={initialValues}
					{ ...extraProps }
					render={({
						form,
						values,
						handleSubmit,
						submitting,
						pristine,
						...formProps
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								<div style={formStyle}>
									<FormComponent
										form={form}
										values={ values }
										submitting={submitting}
										pristine={pristine}
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
										onClick={(e) => {
											e.preventDefault();
											form.submit();
											onClose(e);
										}}
									/>
									<EspressoButton
										buttonText={'Reset'}
										disabled={submitting || pristine}
										onClick={form.reset}
									/>
								</div>
								<pre style={ dataStyle }>
									{ JSON.stringify( values, 0, 2 ) }
								</pre>
							</form>
						);
					}}
				/>
			</div>
		</Overlay>
	);
};

export default FormModal;
