/**
 * WordPress dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { EventAttendees } from '../../widgets/event-attendees/block';

export class ContactAvatar extends React.Component
{
	render() {
		return (
			<div className="{props.avatar.baseClass}-div">
				<img
					src={ props.avatar.url}
					className="{props.avatar.baseClass}-avatar-img avatar"
					height="{props.avatar.height}"
					width="{props.avatar.width}"
				/>
			</div>
		);
	}
}

ContactAvatar.propTypes = {
	avatar: PropTypes.shape( {
		url: PropTypes.string,
		baseClass: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
	} ),
};

EventAttendees.defaultProps = {
	avatar: {
		url: '',
		baseClass: '',
		height: 32,
		width: 32
	}
};
