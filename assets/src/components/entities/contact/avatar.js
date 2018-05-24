/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';


const ContactAvatar = ( { avatar } ) => {
	return (
		<div className="{avatar.baseClass}-div">
			<img
				className="{avatar.baseClass}-avatar-img avatar"
				src={avatar.url}
				height="{avatar.height}"
				width="{avatar.width}"
			/>
		</div>
	);
};

ContactAvatar.propTypes = {
	avatar: PropTypes.shape({
		url: PropTypes.string.required,
		baseClass: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
	})
};

ContactAvatar.defaultProps = {
	avatar: {
		url: '',
		baseClass: '',
		height: 32,
		width: 32,
	},
};

export default ContactAvatar
