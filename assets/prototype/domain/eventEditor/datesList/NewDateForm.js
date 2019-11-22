import { Field } from 'react-final-form';

const lblStyle = {
	color: 'grey',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	paddingRight: '1em',
	textAlign: 'right',
	width: '30%',
	minWidth: '80px',
};

const inputStyle = {
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '200px',
	width: '60%',
};

const divStyle = {
	display: 'block',
	margin: '0 0 1em',
	width: '100%',
};

const NewDateForm = () => {
	return (
		<>
			<div style={ divStyle }>
				<label style={ lblStyle } >Name</label>
				<Field
					name="name"
					component="input"
					type="text"
					placeholder="Name"
					style={ inputStyle }
				/>
			</div>
			<div style={ divStyle }>
				<label style={ lblStyle }>Description</label>
				<Field
					name="description"
					component="input"
					type="text"
					placeholder="description"
					style={ inputStyle }
				/>
			</div>
		</>
	);
};

export default NewDateForm;
