/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ContactAvatar = ( {
	avatarUrl,
	avatarClass,
	avatarHeight,
	avatarWidth
} ) => {
	return (
		<div className={ avatarClass + "-image-wrap-div" }>
			<img
				className={ avatarClass + "-avatar-img avatar" }
				src={ avatarUrl }
				height={ avatarHeight }
				width={ avatarWidth }
			/>
		</div>
	);
};

ContactAvatar.propTypes = {
	avatarUrl: PropTypes.string.required,
	avatarClass: PropTypes.string,
	avatarHeight: PropTypes.number,
	avatarWidth: PropTypes.number,
};

ContactAvatar.defaultProps = {
	avatarUrl: '',
	avatarClass: 'contact',
	avatarHeight: 32,
	avatarWidth: 32,
};

export default ContactAvatar
