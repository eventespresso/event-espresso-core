/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';


export const ContactAvatar = ( props ) => {
	return (
		<div className="{props.avatar.baseClass}-div">
			<img
				src={props.avatar.url}
				className="{props.avatar.baseClass}-avatar-img avatar"
				height="{props.avatar.height}"
				width="{props.avatar.width}"
			/>
		</div>
	);
};

ContactAvatar.propTypes = {
	avatar: PropTypes.shape( {
		url: PropTypes.string,
		baseClass: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
	} ),
};

ContactAvatar.defaultProps = {
	avatar: {
		url: '',
		baseClass: '',
		height: 32,
		width: 32,
	},
};
