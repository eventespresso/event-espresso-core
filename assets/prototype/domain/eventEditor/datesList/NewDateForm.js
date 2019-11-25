import { Fragment } from '@wordpress/element';
import { Field } from 'react-final-form';
import { H2 } from '@blueprintjs/core/lib/esm';

const hdrStyle = {
	margin: '1em 0 .5em 24%'
};

const lblStyle = {
	boxSizing: 'border-box',
	color: 'grey',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '80px',
	paddingRight: '1em',
	textAlign: 'right',
	verticalAlign: 'top',
	width: '24%'
};

const inputStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '200px',
	width: '60%'
};

const divStyle = {
	boxSizing: 'border-box',
	display: 'block',
	margin: '0 0 1em',
	width: '100%'
};

const NewDateForm = () => {
	return (
		<Fragment>
			<H2 style={hdrStyle}>New Date Details</H2>
			<div style={divStyle}>
				<label style={lblStyle}>Name</label>
				<Field
					name="name"
					component="input"
					type="text"
					placeholder="Name"
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Description</label>
				<Field
					name="description"
					component="input"
					type="text"
					placeholder="description"
					style={inputStyle}
				/>
			</div>
		</Fragment>
	);
};

export default NewDateForm;
