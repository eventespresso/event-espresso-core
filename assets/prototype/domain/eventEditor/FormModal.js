import classNames from 'classnames';
import { Classes, Overlay } from '@blueprintjs/core/lib/esm';
import { Form } from 'react-final-form';
import { EspressoButton } from '../../../ZZZ/components/ui';

const FormModal = ({ FormComponent, initialValues, onSubmit, onClose, isOpen }) => {
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
		top: '0',
		left: 'calc(50vw - 200px)',
		margin: '10vh 0',
		width: '400px'
	};

	const formStyle = {
		padding: '2em 2em 1em'
	};

	const btnRowStyle = {
		padding: '1em 2em 2em',
		textAlign: 'right'
	};

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
					render={({
						form,
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
							</form>
						);
					}}
				/>
			</div>
		</Overlay>
	);
};

export default FormModal;
